// Text selection and note creation functionality
let selectedText = '';
let selectionRange = null;

// Sledování výběru textu v oblasti lekce
document.addEventListener('mouseup', function (e) {
  const selection = window.getSelection();
  const text = selection.toString().trim();

  // Zkontroluj, zda je výběr uvnitř tab-content
  const tabContent = e.target.closest('.tab-content[data-tab="lekce"]');

  if (text.length > 0 && tabContent) {
    selectedText = text;
    selectionRange = selection.getRangeAt(0);
    showNoteTooltip(e);
  } else {
    hideNoteTooltip();
  }
});

// Skrytí tooltipu při kliknutí mimo
document.addEventListener('mousedown', function (e) {
  const tooltip = document.getElementById('note-tooltip');
  const modal = document.getElementById('note-modal');

  if (!tooltip.contains(e.target) && !modal.contains(e.target)) {
    hideNoteTooltip();
  }
});

function showNoteTooltip(e) {
  const tooltip = document.getElementById('note-tooltip');
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rects = range.getClientRects();

    // Získej poslední řádek výběru (poslední obdélník)
    const lastRect = rects[rects.length - 1];

    if (lastRect) {
      tooltip.style.display = 'block';
      // Umísti tooltip vpravo vedle posledního slova
      tooltip.style.left = (lastRect.right + 8) + 'px'; // 8px mezera od textu
      tooltip.style.top = (lastRect.top + (lastRect.height / 2) - 18.5 + window.scrollY) + 'px'; // Vycentruj vertikálně (37px / 2 = 18.5px)
    }
  }
}

function hideNoteTooltip() {
  const tooltip = document.getElementById('note-tooltip');
  tooltip.style.display = 'none';
}

// Otevření modalu pro vytvoření poznámky
document.addEventListener('DOMContentLoaded', function () {
  const createNoteBtn = document.getElementById('create-note-btn');
  if (createNoteBtn) {
    createNoteBtn.addEventListener('click', function () {
      const modal = document.getElementById('note-modal');
      const textarea = document.getElementById('note-textarea');

      // Pozice modalu pod vybraným textem
      if (selectionRange) {
        const rects = selectionRange.getClientRects();
        const lastRect = rects[rects.length - 1];

        modal.style.display = 'block';
        modal.style.left = lastRect.left + 'px';
        modal.style.top = (lastRect.bottom + 8 + window.scrollY) + 'px';
      }

      textarea.value = '';
      textarea.focus();
      hideNoteTooltip();
    });
  }

  // Zabránit zavření modalu při kliknutí dovnitř
  const modal = document.getElementById('note-modal');
  const modalContent = document.querySelector('.note-modal-content');
  const modalOverlay = document.querySelector('.note-modal-overlay');

  if (modalContent) {
    modalContent.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  // Zavřít modal pouze při kliknutí na overlay
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target === modalOverlay) {
        closeNoteModal();
      }
    });
  }
});

function closeNoteModal() {
  const modal = document.getElementById('note-modal');
  const modalHeader = modal.querySelector('.note-modal-header h3');

  modal.style.display = 'none';
  modal.style.transform = '';

  // Resetovat nadpis modalu pokud jsme editovali
  if (modal.dataset.editingNoteId) {
    modalHeader.textContent = 'Přidat poznámku';
    delete modal.dataset.editingNoteId;
  }

  // Odstraň selection pouze při zrušení (ne při uložení)
  if (!modal.dataset.saving) {
    window.getSelection().removeAllRanges();
  }

  selectedText = '';
  selectionRange = null;
  delete modal.dataset.saving;
}

function saveNote() {
  const noteText = document.getElementById('note-textarea').value.trim();
  const modal = document.getElementById('note-modal');
  const modalHeader = modal.querySelector('.note-modal-header h3');
  const editingNoteId = modal.dataset.editingNoteId;

  if (noteText.length === 0) {
    alert('Prosím, napište poznámku.');
    return;
  }

  // Pokud editujeme existující poznámku
  if (editingNoteId) {
    let notes = JSON.parse(localStorage.getItem('lessonNotes') || '[]');
    const noteIndex = notes.findIndex(n => n.id === parseInt(editingNoteId));

    if (noteIndex !== -1) {
      // Aktualizovat text poznámky
      notes[noteIndex].noteText = noteText;
      notes[noteIndex].timestamp = new Date().toISOString();
      localStorage.setItem('lessonNotes', JSON.stringify(notes));

      // Aktualizovat tooltip v highlighted textu
      const highlightedElement = document.querySelector(`[data-note-id="${editingNoteId}"]`);
      if (highlightedElement) {
        const tooltip = highlightedElement.querySelector('.note-hover-tooltip');
        if (tooltip) {
          const noteTextElement = tooltip.querySelector('.note-tooltip-text');
          if (noteTextElement) {
            noteTextElement.textContent = noteText;
          }
        }
      }

      // Aktualizovat zobrazení poznámek v tabu
      displayNotesInTab();

      // Resetovat modal
      delete modal.dataset.editingNoteId;
      modalHeader.textContent = 'Přidat poznámku';
      modal.style.transform = '';

      closeNoteModal();
      showNotification('Poznámka byla úspěšně upravena!');
      return;
    }
  }

  // Vytvoření nové poznámky (původní kód)
  const note = {
    id: Date.now(),
    selectedText: selectedText,
    noteText: noteText,
    timestamp: new Date().toISOString()
  };

  // Uložení do localStorage
  let notes = JSON.parse(localStorage.getItem('lessonNotes') || '[]');
  notes.push(note);
  localStorage.setItem('lessonNotes', JSON.stringify(notes));

  // Zvýraznění vybraného textu
  if (selectionRange) {
    highlightSelectedText(selectionRange, note.id);
  }

  // Zobrazení poznámek v tabu "Moje poznámky"
  displayNotesInTab();

  // Označit, že ukládáme (ne rušíme)
  modal.dataset.saving = 'true';

  // Resetovat nadpis modalu
  modalHeader.textContent = 'Přidat poznámku';

  closeNoteModal();

  // Odstranit selection až po zvýraznění
  setTimeout(() => {
    window.getSelection().removeAllRanges();
  }, 100);

  // Zobrazení úspěšné notifikace
  showNotification('Poznámka byla úspěšně uložena!');
}

function highlightSelectedText(range, noteId) {
  const span = document.createElement('span');
  span.className = 'highlighted-note';
  span.setAttribute('data-note-id', noteId);

  // Získat text poznámky
  const notes = JSON.parse(localStorage.getItem('lessonNotes') || '[]');
  const note = notes.find(n => n.id === noteId);
  const noteText = note ? note.noteText : '';

  // Vytvoření tooltipu s textem poznámky
  const tooltip = document.createElement('div');
  tooltip.className = 'note-hover-tooltip';
  tooltip.innerHTML = `
    <p class="note-tooltip-text">${noteText}</p>
    <div class="note-tooltip-buttons">
      <button class="note-hover-btn" onclick="editNote(${noteId}); event.stopPropagation();">
        <i class="fas fa-pen"></i>Editovat
      </button>
      <button class="note-hover-btn note-delete-btn-tooltip" data-note-id="${noteId}" onclick="toggleDeleteConfirm(this, ${noteId}); event.stopPropagation();">
        <i class="fas fa-trash"></i>Smazat
      </button>
    </div>
  `;

  try {
    range.surroundContents(span);
    span.appendChild(tooltip);

    // Přidání event listeneru pro zobrazení tooltipu při kliknutí
    span.addEventListener('click', function (e) {
      e.stopPropagation();

      // Zavři všechny ostatní tooltips
      document.querySelectorAll('.note-hover-tooltip.active').forEach(t => {
        if (t !== tooltip) t.classList.remove('active');
      });

      // Toggle tooltip
      tooltip.classList.toggle('active');
    });
  } catch (e) {
    console.log('Nelze zvýraznit výběr přes více elementů');
  }
}

function toggleDeleteConfirm(button, noteId) {
  const isConfirm = button.classList.contains('confirm-delete');

  if (isConfirm) {
    // Potvrdit smazání
    confirmDeleteNote(noteId);
  } else {
    // Změnit na "Potvrdit"
    button.classList.add('confirm-delete');
    button.innerHTML = '<i class="fas fa-check"></i>Potvrdit';
  }
}

function confirmDeleteNote(noteId) {
  let notes = JSON.parse(localStorage.getItem('lessonNotes') || '[]');
  notes = notes.filter(n => n.id !== noteId);
  localStorage.setItem('lessonNotes', JSON.stringify(notes));

  // Odstranění zvýraznění
  const highlightedElement = document.querySelector(`[data-note-id="${noteId}"]`);
  if (highlightedElement) {
    const parent = highlightedElement.parentNode;
    while (highlightedElement.firstChild) {
      parent.insertBefore(highlightedElement.firstChild, highlightedElement);
    }
    parent.removeChild(highlightedElement);
  }

  displayNotesInTab();
  showNotification('Poznámka byla smazána.');
}

// Zavřít tooltip při kliknutí mimo nebo na tab
document.addEventListener('click', function (e) {
  // Zavřít tooltip A MODAL při kliknutí na tab
  if (e.target.matches('.tab') || e.target.closest('.tab')) {
    document.querySelectorAll('.note-hover-tooltip.active').forEach(t => {
      t.classList.remove('active');
    });

    // Zavřít i modal pro přidání poznámky
    const modal = document.getElementById('note-modal');
    if (modal && modal.style.display === 'block') {
      closeNoteModal();
    }
    return;
  }

  // Zavřít tooltip při kliknutí mimo
  if (!e.target.closest('.highlighted-note')) {
    document.querySelectorAll('.note-hover-tooltip.active').forEach(t => {
      t.classList.remove('active');
    });
  }
});

function editNote(noteId) {
  // Najít poznámku
  const notes = JSON.parse(localStorage.getItem('lessonNotes') || '[]');
  const note = notes.find(n => n.id === noteId);

  if (!note) {
    console.log('Poznámka nenalezena');
    return;
  }

  // Najít tooltip v highlighted elementu
  const highlightedElement = document.querySelector(`[data-note-id="${noteId}"]`);
  const tooltip = highlightedElement.querySelector('.note-hover-tooltip');

  if (!tooltip) return;

  // Uložit původní obsah pro případné zrušení
  tooltip.dataset.originalContent = tooltip.innerHTML;
  tooltip.dataset.editingNoteId = noteId;

  // Nahradit obsah tooltiptu editačním formulářem
  tooltip.innerHTML = `
    <textarea class="note-edit-textarea" style="width: 100%; min-height: 80px; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit; font-size: 14px; resize: vertical;">${note.noteText}</textarea>
    <div class="note-tooltip-buttons" style="margin-top: 8px;">
      <button class="note-hover-btn" onclick="saveEditedNote(${noteId}); event.stopPropagation();" style="background: #4CAF50; color: white;">
        <i class="fas fa-check"></i>Uložit
      </button>
      <button class="note-hover-btn" onclick="cancelEditNote(${noteId}); event.stopPropagation();" style="background: #f44336; color: white;">
        <i class="fas fa-times"></i>Zrušit
      </button>
    </div>
  `;

  // Focus na textarea
  const textarea = tooltip.querySelector('.note-edit-textarea');
  if (textarea) {
    textarea.focus();
    // Nastavit kurzor na konec textu
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }
} function displayNotesInTab() {
  const notesTab = document.querySelector('.tab-content[data-tab="poznamky"]');
  const notes = JSON.parse(localStorage.getItem('lessonNotes') || '[]');

  if (notes.length === 0) {
    notesTab.innerHTML = `
      <h3 class="content-heading">Moje poznámky</h3>
      <p class="content-text">Zatím nemáte žádné poznámky. Označte text v lekci a vytvořte si poznámku.</p>
    `;
  } else {
    let notesHtml = `
      <div class="notes-page-header">
        <h3 class="notes-page-title">Poznámky z lekce</h3>
        <div class="notes-page-actions">
          <button class="notes-action-btn">
            <i class="fas fa-download"></i>
          </button>
          <button class="notes-action-btn">
            <i class="fas fa-share-nodes"></i>
          </button>
        </div>
      </div>
      <div class="notes-display-list">
    `;

    notes.reverse().forEach(note => {
      notesHtml += `
        <div class="note-display-card" data-note-id="${note.id}">
          <div class="note-display-selected">
            <span class="note-display-link">
              ${note.selectedText}
            </span>
            <div class="note-action-tooltip">
              <button class="note-find-btn" onclick="findNoteInLesson(${note.id})">
                <i class="fas fa-search"></i>
                Najít v lekci
              </button>
            </div>
          </div>
          <div class="note-display-content">
            <p>${note.noteText}</p>
            <button class="note-copy-btn" onclick="copyNoteText('${note.noteText.replace(/'/g, "\\'")}'); event.stopPropagation();">
              <img src="img/file_copy.png" alt="Kopírovat">
            </button>
          </div>
        </div>
      `;
    });

    notesHtml += `</div>`;
    notesTab.innerHTML = notesHtml;

    // Přidat event listenery pro zobrazení tooltipu
    setTimeout(() => {
      document.querySelectorAll('.note-display-card').forEach(card => {
        card.addEventListener('click', function (e) {
          // Ignorovat kliknutí na tlačítko kopírování nebo najít v lekci
          if (e.target.closest('.note-copy-btn') || e.target.closest('.note-find-btn')) {
            return;
          }

          e.preventDefault();
          e.stopPropagation();

          // Zavřít všechny ostatní tooltipy
          document.querySelectorAll('.note-action-tooltip.active').forEach(t => {
            const tooltip = this.querySelector('.note-action-tooltip');
            if (t !== tooltip) {
              t.classList.remove('active');
            }
          });

          // Toggle tooltip pro tuto kartu
          const tooltip = this.querySelector('.note-action-tooltip');
          tooltip.classList.toggle('active');
        });
      });

      // Zavřít tooltip při kliknutí mimo
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.note-display-card')) {
          document.querySelectorAll('.note-action-tooltip.active').forEach(t => {
            t.classList.remove('active');
          });
        }
      });
    }, 0);
  }
}

function findNoteInLesson(noteId) {
  // Přepnout na tab Lekce
  const lekceTab = document.querySelector('.tab[data-tab="lekce"]');
  if (lekceTab) {
    lekceTab.click();
  }

  // Najít highlighted text a scrollovat k němu
  setTimeout(() => {
    const highlightedElement = document.querySelector(`[data-note-id="${noteId}"]`);
    if (highlightedElement) {
      highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      highlightedElement.style.backgroundColor = '#D4EDFF';
      setTimeout(() => {
        highlightedElement.style.backgroundColor = '';
      }, 2000);
    }
  }, 100);
}

function copyNoteText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Text poznámky byl zkopírován');
  });
}

function deleteNote(noteId) {
  let notes = JSON.parse(localStorage.getItem('lessonNotes') || '[]');
  notes = notes.filter(n => n.id !== noteId);
  localStorage.setItem('lessonNotes', JSON.stringify(notes));

  // Odstranění zvýraznění
  const highlightedElement = document.querySelector(`[data-note-id="${noteId}"]`);
  if (highlightedElement) {
    const parent = highlightedElement.parentNode;
    while (highlightedElement.firstChild) {
      parent.insertBefore(highlightedElement.firstChild, highlightedElement);
    }
    parent.removeChild(highlightedElement);
  }

  displayNotesInTab();
  showNotification('Poznámka byla smazána.');
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'note-notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Načtení poznámek při načtení stránky
window.addEventListener('load', function () {
  displayNotesInTab();
});

function saveEditedNote(noteId) {
  const highlightedElement = document.querySelector(`[data-note-id="${noteId}"]`);
  const tooltip = highlightedElement.querySelector('.note-hover-tooltip');
  const textarea = tooltip.querySelector('.note-edit-textarea');

  const newNoteText = textarea.value.trim();

  if (newNoteText.length === 0) {
    alert('Poznámka nemůže být prázdná.');
    return;
  }

  // Aktualizovat v localStorage
  let notes = JSON.parse(localStorage.getItem('lessonNotes') || '[]');
  const noteIndex = notes.findIndex(n => n.id === noteId);

  if (noteIndex !== -1) {
    notes[noteIndex].noteText = newNoteText;
    notes[noteIndex].timestamp = new Date().toISOString();
    localStorage.setItem('lessonNotes', JSON.stringify(notes));

    // Obnovit tooltip s novým textem
    tooltip.innerHTML = `
      <p class="note-tooltip-text">${newNoteText}</p>
      <div class="note-tooltip-buttons">
        <button class="note-hover-btn" onclick="editNote(${noteId}); event.stopPropagation();">
          <i class="fas fa-pen"></i>Editovat
        </button>
        <button class="note-hover-btn note-delete-btn-tooltip" data-note-id="${noteId}" onclick="toggleDeleteConfirm(this, ${noteId}); event.stopPropagation();">
          <i class="fas fa-trash"></i>Smazat
        </button>
      </div>
    `;

    // Aktualizovat zobrazení v tabu
    displayNotesInTab();

    // Zavřít tooltip
    tooltip.classList.remove('active');

    showNotification('Poznámka byla úspěšně upravena!');
  }

  delete tooltip.dataset.originalContent;
  delete tooltip.dataset.editingNoteId;
}

function cancelEditNote(noteId) {
  const highlightedElement = document.querySelector(`[data-note-id="${noteId}"]`);
  const tooltip = highlightedElement.querySelector('.note-hover-tooltip');

  // Obnovit původní obsah
  if (tooltip.dataset.originalContent) {
    tooltip.innerHTML = tooltip.dataset.originalContent;
    delete tooltip.dataset.originalContent;
    delete tooltip.dataset.editingNoteId;
  }

  // Zavřít tooltip
  tooltip.classList.remove('active');
}

// Export funkcí pro použití v HTML
window.closeNoteModal = closeNoteModal;
window.saveNote = saveNote;
window.deleteNote = deleteNote;
window.editNote = editNote;
window.saveEditedNote = saveEditedNote;
window.cancelEditNote = cancelEditNote;
window.findNoteInLesson = findNoteInLesson;
window.copyNoteText = copyNoteText;
window.toggleDeleteConfirm = toggleDeleteConfirm;
window.confirmDeleteNote = confirmDeleteNote;
