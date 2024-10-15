// Funzione per tornare alla pagina precedente
function goBack() {
  window.history.back();
}

// Gestione del form nella pagina di selezione
if (document.getElementById('product-selection')) {
  document.getElementById('product-selection').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const year = document.getElementById('year').value;
      const language = document.getElementById('language').value;
      
      // Reindirizza alla pagina dei dettagli con i parametri
      window.location.href = `../index.html?year=${year}&lang=${language}`;
  });
}

// Funzione per caricare i dettagli del prodotto
function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const year = urlParams.get('year');
  const lang = urlParams.get('lang');
  
  if (year) {
      document.getElementById('product-year').textContent = year;
  }
  
  // Aggiorna il contenuto in base alla lingua selezionata
  switch(lang) {
    case 'IT':
        document.getElementById('product-title').textContent = 'TEMPERATRICE PROFESSIONALE CIOCCOLATO';
        document.getElementById('product-specs').innerHTML = 'Capacità vasca: 35 kg<br>Produzione oraria: 170 kg';
        document.getElementById('pdf-link').textContent = 'Scarica la scheda tecnica PDF';
        break;
    case 'EN':
        document.getElementById('product-title').textContent = 'PROFESSIONAL CHOCOLATE TEMPERING MACHINE';
        document.getElementById('product-specs').innerHTML = 'Bowl Capacity: 35 kg<br>Hourly production: 170 kg';
        document.getElementById('pdf-link').textContent = 'Download the technical sheet PDF';
        break;
    case 'SP':
        document.getElementById('product-title').textContent = 'TEMPERADORA PROFESIONAL DE CHOCOLATE';
        document.getElementById('product-specs').innerHTML = 'Capacidad del recipiente: 35 kg<br>Producción por hora: 170 kg';
        document.getElementById('pdf-link').textContent = 'Descargar la ficha técnica PDF';
        break;
    case 'FR':
        document.getElementById('product-title').textContent = 'TEMPÉREUSE PROFESSIONNELLE À CHOCOLAT';
        document.getElementById('product-specs').innerHTML = 'Capacité de la cuve: 35 kg<br>Production horaire: 170 kg';
        document.getElementById('pdf-link').textContent = 'Télécharger la fiche technique PDF';
        break;
    case 'CN':
        document.getElementById('product-title').textContent = '专业巧克力调温机';
        document.getElementById('product-specs').innerHTML = '碗容量：35公斤<br>每小时产量：170公斤';
        document.getElementById('pdf-link').textContent = '下载技术规格PDF';
        break;
    case 'RU':
        document.getElementById('product-title').textContent = 'ПРОФЕССИОНАЛЬНАЯ ТЕМПЕРИРУЮЩАЯ МАШИНА ДЛЯ ШОКОЛАДА';
        document.getElementById('product-specs').innerHTML = 'Объем чаши: 35 кг<br>Почасовое производство: 170 кг';
        document.getElementById('pdf-link').textContent = 'Скачать технический паспорт PDF';
        break;
    default:
        // Se la lingua non è riconosciuta, usa l'inglese come predefinito
        document.getElementById('product-title').textContent = 'PROFESSIONAL CHOCOLATE TEMPERING MACHINE';
        document.getElementById('product-specs').innerHTML = 'Bowl Capacity: 35 kg<br>Hourly production: 170 kg';
        document.getElementById('pdf-link').textContent = 'Download the technical sheet PDF';
}
}

// Verifica se siamo nella pagina dei dettagli del prodotto
if (document.getElementById('product-year')) {
  loadProductDetails();
}