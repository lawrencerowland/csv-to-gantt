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

// Render a sample Gantt on page load so the site isn’t blank

document.addEventListener('DOMContentLoaded', () => {
  const sampleTasks = [
    {id:1,name:'Planning',start:'2025-06-01',end:'2025-06-03',progress:0,dependencies:''},
    {id:2,name:'Design',start:'2025-06-04',end:'2025-06-07',progress:0,dependencies:'1'},
    {id:3,name:'Development',start:'2025-06-08',end:'2025-06-20',progress:0,dependencies:'2'},
    {id:4,name:'Testing',start:'2025-06-21',end:'2025-06-25',progress:0,dependencies:'3'},
    {id:5,name:'Deployment',start:'2025-06-26',end:'2025-06-27',progress:0,dependencies:'4'}
  ];
  renderGantt(sampleTasks);
});
