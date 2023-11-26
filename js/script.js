// Obtém elementos do documento pelo ID
const wheel = document.getElementById("wheel"); // Obtém o elemento com o ID "wheel"
const spinBtn = document.getElementById("spin-btn"); // Obtém o elemento com o ID "spin-btn"
const finalValue = document.getElementById("final-value"); // Obtém o elemento com o ID "final-value"

// Obtém o elemento de áudio pelo ID
const resultSound = document.getElementById("resultSound");

// Função para reproduzir o som
const playResultSound = () => {
  resultSound.play(); // Inicia a reprodução do áudio
};

// Define o volume para um valor
resultSound.volume = 0.3;

// Objeto que armazena valores de ângulo mínimo e máximo para um valor
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 'Ela q \nmanda 😮' },
  { minDegree: 31, maxDegree: 90, value: 'Valorant 🔫' },
  { minDegree: 91, maxDegree: 150, value: 'Lolzin 🧚‍♂️🧚‍♀️' },
  { minDegree: 151, maxDegree: 210, value: 'Assistir \nanime 🐱‍👤' },
  { minDegree: 211, maxDegree: 270, value: 'Programar 👨‍💻👩‍💻' },
  { minDegree: 271, maxDegree: 330, value: 'Lethal \nCompany' },
  { minDegree: 331, maxDegree: 360, value: 'Ela q \nmanda 😮' },
];

// Tamanho de cada pedaço
const data = [16, 16, 16, 16, 16, 16];

// Cor de fundo para cada pedaço
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];

// Criação do gráfico
let myChart = new Chart(wheel, {
  // Plugin para exibir texto no gráfico de pizza
  plugins: [ChartDataLabels],
  // Tipo de gráfico: Pizza
  type: "pie",
  data: {
    // Rótulos (valores a serem exibidos no gráfico)
    labels: [
      'Valorant \n🔫', 
      'Ela q \nmanda \n😮',  
      'Lethal \nCompany \n👩‍🚀👨‍🚀', 
      'Programar \n👨‍💻👩‍💻', 
      'Assistir \nanime \n🐱‍👤', 
      'Lolzin \n🧚‍♂️🧚‍♀️',
    ],
    // Configurações para o conjunto de dados/pizza
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    // Gráfico responsivo
    responsive: true,
    animation: { duration: 0 }, // Desativa a animação
    plugins: {
      // Oculta dica de ferramenta e legenda
      tooltip: false,
      legend: {
        display: false,
      },
      // Exibe rótulos dentro do gráfico de pizza
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 20 },
      },
    },
  },
});

// Exibe o valor com base no ângulo aleatório
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    // Se o ângulo estiver entre o mínimo e o máximo, exibe o valor
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Nós vamos: ${i.value}</p>`;
      spinBtn.disabled = false;
      playResultSound(); // Chama a função para reproduzir o som
      break;
    }
  }
};

// Contagem de giros
let count = 0;
// 100 rotações para a animação e a última rotação para o resultado
let resultValue = 101;

// Inicia a rotação
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  // Limpa o valor final
  finalValue.innerHTML = `<p>Boa sorte!</p>`;
  // Gera graus aleatórios para parar
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  // Intervalo para a animação de rotação
  let rotationInterval = window.setInterval(() => {
    // Define a rotação para o gráfico de pizza
    /*
    Inicialmente, para fazer o gráfico de pizza girar mais rápido, definimos resultValue como 101 para que ele gire 101 graus de cada vez, e isso diminui em 1 a cada contagem. Eventualmente, na última rotação, giramos 1 grau de cada vez.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    // Atualiza o gráfico com o novo valor
    myChart.update();
    // Se a rotação for maior ou igual a 360, redefina para 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
