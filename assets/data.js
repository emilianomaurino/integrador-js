const newsData = [
	{
		id: 1,
		name: "Merentiel",
		category: "futbolM",
		cardImg: "./assets/img/merentiel.jpg",
        title: "Conquistó la 7ma.",
        info: "Con un golazo de Merentiel Boca se impuso 2a1 a Flamengo y se quedó con la Copa Libertadores",
	},
    {
		id: 2,
		name: "Zeballos",
		category: "futbolM",
		cardImg: "./assets/img/bocaZeballos.jpg",
        title: "En la recta final",
        info: "El changuito se pone a punto y volvería a jugar el próximo domingo frente a Lanus",
	},
    {
		id: 3,
		name: "Rojo",
		category: "futbolM",
		cardImg: "./assets/img/rojo.jpg",
        title: "El mejor regreso",
        info: "El capitán volvió a jugar después de mas de 8 meses y el equipo volvió al triunfo",
	},
    {
		id: 4,
		name: "Equipo",
		category: "futbolM",
		cardImg: "./assets/img/bocaEntrenamiento.jpg",
        title: "El probable equipo de Almirón",
        info: "Estos serían los 11 que pararía el técnico el próximo partido",
	},
    {
		id: 5,
		name: "Femenino Campeon",
		category: "futbolF",
		cardImg: "./assets/img/femCampeon.jpg",
        title: "Campeonas",
        info: "En un campeonato apasionante, las gladiadoras volvieron a gritar campeón",
	},
    {
		id: 6,
		name: "Clasico",
		category: "futbolF",
		cardImg: "./assets/img/fem2.jpg",
        title: "Boca se quedó con el clásico",
        info: "Con 2 goles de Andrea Ojeda Boca derrotó 2 a 0 a Riber",
	},
    {
		id: 7,
		name: "Clasico Formación",
		category: "futbolF",
		cardImg: "./assets/img/futFem1.jpg",
        title: "El equipo para la final",
        info: "Así formaría boca el domingo en una bombonera llena",
	},
    {
		id: 8,
		name: "Basquet final",
		category: "basquetM",
		cardImg: "./assets/img/basquet3.jpg",
        title: "A la final",
        info: "Boca venció a Instituto en Córdoba y vuelve a las finales de la liga",
	},
    {
		id: 9,
		name: "Basquet Igualado",
		category: "basquetM",
		cardImg: "./assets/img/basquet1.jpg",
        title: "A un triunfo de las finales",
        info: "El Xeneize ganó de local e igualó la serie a 2. Ahora se define en Cordoba",
	},
    {
		id: 10,
		name: "Basquet 2 a 1",
		category: "basquetM",
		cardImg: "./assets/img/basquet2.jpg",
        title: "Primer triunfo",
        info: "En un partido apretado Boca ganó el 3er juego y puso la serie 2 a 1",
	}

]

const aboutData = [
	{
		id: 1,
		name: "informacion",
		category: "news",
		cardImg: "./assets/img/bombonera2.jpg",
        title: "noticias al instante durante las 24 hs.",
	},
	{
		id: 2,
		name: "streaming",
		category: "streaming",
		cardImg: "./assets/img/partidosBoca.jpg",
        title: "streaming en vivo de los partidos de boca",
	},
	{
		id: 3,
		name: "programas",
		category: "programs",
		cardImg: "./assets/img/bombonera3.jpg",
        title: "programas en vivo",
	},
]

const divideNewsInParts = (size) => {
	let newsList = [];
	for (let index = 0; index < newsData.length; index += size) {
		newsList.push(newsData.slice(index, index + size));	
	}
	return newsList;
};


const appState = {
	news: divideNewsInParts(6),
	about: aboutData,
	currentNewsIndex: 0,
	newsLimit: divideNewsInParts(6).length,
	activeFilter: null,
}

console.log(appState.news);



