// Перехватываем нажатия клавиш в capture фазе, чтобы сработать раньше сайта
document.addEventListener('keydown', function(event) {
  // Игнорируем, если фокус в поле ввода
  const targetTag = event.target.tagName;
  const isEditable = targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT' || event.target.isContentEditable;
  
  if (isEditable) {
    return;
  }
  
  let keyToEmulate = null;
  
  // Русская раскладка: о = j (следующая), л = k (предыдущая)
  if (event.key === 'о') keyToEmulate = 'j';
  if (event.key === 'л') keyToEmulate = 'k';
  
  if (keyToEmulate) {
    event.preventDefault();
    event.stopPropagation();
    
    // Эмулируем английское нажатие с теми же модификаторами
    const newEvent = new KeyboardEvent('keydown', {
      key: keyToEmulate,
      code: event.code,
      bubbles: true,
      cancelable: true,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      metaKey: event.metaKey
    });
    
    document.dispatchEvent(newEvent);
  }
}, true);
