const csvInput = document.getElementById('csvFile');
const downloadBtn = document.getElementById('downloadBtn');
let gantt;

csvInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      const tasks = results.data.map((row, index) => ({
        id: index + 1,
        name: row.Task || `Task ${index + 1}`,
        start: row['Start Date'],
        end: row['End Date'],
        progress: 0,
        dependencies: row.Dependency || ''
      }));
      renderGantt(tasks);
    }
  });
});

function renderGantt(tasks) {
  const ganttContainer = document.getElementById('gantt');
  ganttContainer.innerHTML = '';
  gantt = new Gantt(ganttContainer, tasks, {
    view_mode: 'Day',
    date_format: 'YYYY-MM-DD'
  });
  downloadBtn.disabled = false;
}

downloadBtn.addEventListener('click', () => {
  if (!gantt) return;
  html2canvas(document.getElementById('gantt')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'gantt.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});
