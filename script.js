document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const gridSize = 20; // Μέγεθος 20x20
    const cellSize = 20; // Μέγεθος κάθε κελιού
    const selectedColor = "#a40707"; // Χρώμα που θα χρησιμοποιήσουμε για το γέμισμα
    const saveButton = document.getElementById("saveButton");

    if (canvas) {
        // Δημιουργία κελιών στο grid
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            // Προσθέτουμε event listener για κλικ σε κάθε κελί
            cell.addEventListener("click", function () {
                if (cell.classList.contains("filled")) {
                    cell.classList.remove("filled");
                    cell.style.backgroundColor = "#ffffff";
                } else {
                    cell.classList.add("filled");
                    cell.style.backgroundColor = selectedColor;
                }
            });

            canvas.appendChild(cell);
        }
    } else {
        console.error("Το στοιχείο canvas δεν βρέθηκε.");
    }

    // Λειτουργία αποθήκευσης του grid ως εικόνα PNG
    saveButton.addEventListener("click", function () {
        // Δημιουργούμε έναν νέο καμβά
        const exportCanvas = document.createElement("canvas");
        exportCanvas.width = gridSize * cellSize;
        exportCanvas.height = gridSize * cellSize;
        const ctx = exportCanvas.getContext("2d");

        // Σχεδιάζουμε κάθε κελί στον καμβά
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            const x = (index % gridSize) * cellSize;
            const y = Math.floor(index / gridSize) * cellSize;

            // Αν το κελί έχει την κλάση 'filled', το χρωματίζουμε
            ctx.fillStyle = cell.classList.contains("filled") ? selectedColor : "#ffffff";
            ctx.fillRect(x, y, cellSize, cellSize);
        });

        // Μετατροπή του καμβά σε URL εικόνας και λήψη
        const dataURL = exportCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "digital_embroidery.png";
        link.click();
    });
});
