import{Table} from "/table.js";

const btn = document.querySelector("button");
// const table = document.querySelector("table");
const showEdit = document.querySelector("section div");
const exportExcel = document.querySelector("#export");
const importExcel  = document.querySelector("input");
const screen = document.querySelector("#screen");
const cancelScreen = document.querySelector("#cancel-screen");
const columns = document.querySelector("#columns");

let table = new Table();

btn.addEventListener("click",function() {
	
	table.createTable("姓名","语文","数学","英语","总分","操作");
	table.addTable("张三","70","80","90");
	table.addTable("李四","56","93","60");
	table.addTable("王五","90","70","80");
	table.addTable("张三","70","80","90");
	table.addTable("李四","56","93","60");
	table.addTable("王五","90","70","80");
	// table.addTable("张三","70","80","90");
	// table.addTable("李四","56","93","60");
	// table.addTable("王五","90","70","80");
	// table.addTable("张三","70","80","90");
	// table.addTable("李四","56","93","60");
	// table.addTable("王五","90","70","80");
	table.editTable("last");
	table.styleTable();
});

showEdit.addEventListener("click",function() {
	const edit = document.querySelector("#edit");
	edit.style.visibility = "inherit";;
})

exportExcel.addEventListener("click",function() {
	tableToExcel();
})
importExcel.addEventListener("change",function() {
	showfile(this);
});
screen.addEventListener("change",function() {
	let tab = table.tab;
	let value = screen.value;
	for (var i = 1; i < tab.children.length-1; i++) {
		let index = 0;
		let tabNow = tab.children[i];
		for (var j = 0; j < tabNow.children.length; j++) {
			if (tabNow.children[j].textContent.indexOf(value) > -1) {
				index = 1;
			}
		}
		if (index == 0) {
			tabNow.style.display = "none";
		}
	}
})
cancelScreen.addEventListener("click",function() {
	let tab = table.tab;
	for (var i = 0; i < tab.children.length-1; i++) {
		let tabNow = tab.children[i];
		tabNow.style.display = "table-row";
		for (var j = 0; j < tabNow.children.length; j++) {
			//tabNow.children[j].style.display = "block";
		}
	}
});
//导出文件
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function () {
        //根据ID获取table表格HTML
        var table = document.querySelector("table");
        var ctx = { worksheet: 'Worksheet', table: table.innerHTML };
        document.getElementById("export").href = uri + base64(format(template, ctx));
        document.getElementById("export").download = '成绩单.xls';
    }
})()

var excelFile;
// 读取文件的内容
function showfile(obj) {
	if(!obj.files) {
		return;
	}
	var f = obj.files[0];
	var reader = new FileReader();
	reader.readAsBinaryString(f);
	reader.onload = function(e) {
		var data = e.target.result;
		excelFile = XLSX.read(data, {
			type: 'binary'
		});

		//展示所有表
		// for(var i=0;i<excelFile.SheetNames.length;i++){
		// 	　document.getElementById("excelFile").innerHTML +=excelFile.SheetNames[i]+"="+JSON.stringify(XLSX.utils.sheet_to_json(excelFile.Sheets[excelFile.SheetNames[i]]))+"<br/>";
		// 　　　　　　}

		var dataTable1 = "";
		//只展示第一个表
		var headers = new Array();
		var str = XLSX.utils.sheet_to_json(excelFile.Sheets[excelFile.SheetNames[0]])
		dataTable1+= "<table border='1'><tr>"
		console.log(str[0]);
		for(var key in str[0]){
			headers.push(key);  //获取表头
			dataTable1 += "<th>" + key + "</th>";
		}
		dataTable1 += "</tr>"
		// console.log(headers)
		
		//这里显示前五行
		for(var i=0;i<5;i++){
			// var json = JSON.stringify(str[i])
			dataTable1 += "<tr>"
			var json = str[i]
			for( var j=0;j<headers.length;j++){
				dataTable1 += "<td>" + json[headers[j]] + "</td>";
			}
			dataTable1 += "</tr>";
		}

		dataTable1 += "</table>";
		console.log(dataTable1);
		document.getElementById("excelFile").innerHTML = dataTable1

	}
}




	










