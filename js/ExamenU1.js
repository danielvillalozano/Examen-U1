document.addEventListener("DOMContentLoaded", async () => {
    const selectLibro = document.getElementById("idjson");
    const buscarBtn = document.getElementById("buscar");
    const limpiarBtn = document.getElementById("limpiar");
    const tbody = document.getElementById("tbody");
    const mensaje = document.getElementById("mensaje");

    let libros = []; 

    
    const cargarLibros = async () => {
        try {
            console.log("Obteniendo datos de la API...");
            
            const response = await fetch("https://stephen-king-api.onrender.com/api/books");
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            console.log("Respuesta de la API:", data);

       
            if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
                throw new Error("No se encontraron libros en la API.");
            }

            libros = data.data; 

            
            selectLibro.innerHTML = '<option value="">Seleccione un libro</option>';

          
            libros.forEach(libro => {
                const option = document.createElement("option");
                option.value = libro.id;
                option.textContent = `${libro.id} - ${libro.Title}`;
                selectLibro.appendChild(option);
            });

            mensaje.textContent = ""; 
            console.log("Libros cargados correctamente:", libros);
        } catch (error) {
            mensaje.textContent = `Error al cargar los libros de la API: ${error.message}`;
            console.error("Error al obtener libros:", error);
        }
    };

    
    const mostrarLibro = () => {
        const idSeleccionado = selectLibro.value;

        if (!idSeleccionado) {
            mensaje.textContent = "Por favor, selecciona un libro.";
            return;
        }

        // Buscar el libro en el array de libros cargados
        const libro = libros.find(lib => lib.id == idSeleccionado);

        if (!libro) {
            mensaje.textContent = "No se encontró el libro seleccionado.";
            return;
        }

        // Limpiar mensaje de error y la tabla
        mensaje.textContent = "";
        tbody.innerHTML = "";

        // Crear una fila con los datos del libro
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${libro.id}</td>
            <td>${libro.Title}</td>
            <td>${libro.Year || "No disponible"}</td>
            <td>${libro.Pages || "No disponible"}</td>
            <td>${libro.Publisher || "No disponible"}</td> <!-- Editor -->
           
        `;
        tbody.appendChild(fila);
    };

   
    const limpiarCampos = () => {
        selectLibro.value = ""; 
        tbody.innerHTML = ""; 
        mensaje.textContent = ""; 
    };


    buscarBtn.addEventListener("click", mostrarLibro);
    limpiarBtn.addEventListener("click", limpiarCampos);

    
    cargarLibros();
});
