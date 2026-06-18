// Lógica para el contador de visitas
document.addEventListener('DOMContentLoaded', async () => {
    const contadorHoy = document.getElementById('contadorVisitasHoy');
    const contadorMes = document.getElementById('contadorVisitasMes');
    
    if (!contadorHoy || !contadorMes) return;

    try {
        // La URL de tu backend
        const API_URL = 'https://hotel-costa-sur-production.up.railway.app/api/visitas/';
        
        // Registramos la visita siempre que se carga o recarga la página (POST)
        let response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response && response.ok) {
            const data = await response.json();
            contadorHoy.textContent = data.visitas_hoy;
            contadorMes.textContent = data.visitas_mes;
        } else {
            contadorHoy.textContent = "-";
            contadorMes.textContent = "-";
        }
    } catch (error) {
        console.error('Error al obtener el contador de visitas:', error);
        contadorHoy.textContent = "-";
        contadorMes.textContent = "-";
    }
});
