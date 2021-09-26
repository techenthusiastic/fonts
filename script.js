// Sort Diary according to date and slot
function sortDiaryByDate(diary) {
	diary.sort(function (a, b) {
		const dateObj_A = new Date(a.diarydate);
		const dateObj_B = new Date(b.diarydate);
		if (dateObj_A > dateObj_B) return 1;
		else if (dateObj_A < dateObj_B) return -1;
		else return 0;
	});
	return diary;
}
json.diary = sortDiaryByDate(json.diary);
// function to club diary of same date
function clubSameDate(diary) {
	const nDiary = [[]];
	let crntStoreIndex = 0;
	for (let i = 0; i < diary.length; ) {
		const each = diary[i];
		if (
			nDiary[crntStoreIndex].length === 0 ||
			each.diarydate === nDiary[crntStoreIndex][0].diarydate
		) {
			nDiary[crntStoreIndex].push(each);
			i++;
		} else {
			crntStoreIndex++;
			nDiary[crntStoreIndex] = [];
		}
	}
	return nDiary;
}
json.diary = clubSameDate(json.diary);
// function to sort
function sortDiarySameDateByOrder(diary, slots) {
	diary.sort(function (a, b) {
		const orderA = slots[a.diaryslot].order;
		const orderB = slots[b.diaryslot].order;
		if (orderA > orderB) return 1;
		else if (orderA < orderB) return -1;
		else return 0;
	});
	return diary;
}
json.diary.forEach((eachDate, index) => {
	if (eachDate.length > 1) {
		json.diary[index] = sortDiarySameDateByOrder(eachDate, json.slots);
	}
});
// function to prepare presentation date
const dateSup = ["st", "nd", "rd", "th"];
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
function prepareDate(dateString) {
	const dateObj = new Date(dateString);
	const dayName = days[dateObj.getDay()];
	// Prepare Date Presentation
	const date = dateObj.getDate();
	const dt_Sup_Scr = date < 4 ? dateSup[date - 1] : dateSup[3];
	//
	const monthName = " " + monthNames[dateObj.getMonth()];
	const dateStr = `${dayName} ${date} ${dt_Sup_Scr} ${monthName}`;
	console.log(dateStr);
	const pdfDateObj = [
		`${dayName} ${date}`,
		{
			text: dt_Sup_Scr,
			margin: [50, 50, 50, 50],
			relativePosition: { x: 50, y: 10 },
		},
		monthName,
	];
	return pdfDateObj;
}
// console.log(prepareDate(json.diary[0].diarydate));
const obj = prepareDate(json.diary[0].diarydate);
var docDefinition = {
	content: [
		"First paragraph",
		{
			style: "mealDate",
			table: {
				widths: "*",
				body: [
					[
						{
							border: [],
							fillColor: "#ADD8E6",
							style: "mealDateMargin",
							text: [
								{ text: "Thursday 4th September", style: "mealDateMargin" },
							],
						},
					],
				],
			},
		},
		{ stack: [obj[0], {}, obj[2]] },
		{
			text: prepareDate(json.diary[0].diarydate),
		},
		{
			alignment: "justify",
			columns: [
				{
					image: "image22",
					width: 150,
					height: 120,
				},
				{
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.",
				},
			],
		},
	],
	images: {
		image22:
			"https://images.immediate.co.uk/production/volatile/sites/30/2020/08/the-best-spaghetti-bolognese-7e83155.jpg",
	},
	styles: {
		mealDate: {
			fontSize: 22,
			bold: true,
		},
		mealDateMargin: { margin: [10, 5, 0, 5] },
	},
	defaultStyle: {
		font: "yourFontName",
	},
};
// playground requires you to assign document definition to a variable called dd

var dd = {
	content: [
		"First paragraph",
		{ columns: [] },
		{
			text: [
				"Wednesday 1",
				{
					text: "st",
					margin: [50, 50, 50, 50],
					relativePosition: { x: 50, y: 10 },
				},
				" September",
			],
			// 		relativePosition: { x: 50, y: 10},
			//  margin:[50,50,50,50]
		},
	],
	defaultStyle: {
		font: "noto_Sans",
	},
};

// playground requires you to assign document definition to a variable called dd
// console.log(JSON.stringify(docDefinition));
// pdfMake.createPdf(docDefinition).print({}, window);
console.log(pdfMake.fonts);
pdfMake.fonts = {
	yourFontName: {
		normal: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
		bold: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
		italics: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
		bolditalics:
			"https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
	},
};
console.log(pdfMake.fonts);
//
const iframe = document.getElementsByTagName("iframe")[0];
//
const pdfDocGenerator = pdfMake.createPdf(docDefinition);
pdfDocGenerator.getDataUrl((dataUrl) => {
	iframe.src = dataUrl;
});
