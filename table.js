const body = document.querySelector("section");
class Table{
	constructor(){
		this.tab = "";
		this.firstTr = "";
		this.thems = [];
	}
	createTable(){
		//创建表格，添加表头
		let thisTable = this;
		this.tab = document.createElement("table");
		body.prepend(this.tab);
		this.firstTr = document.createElement("tr");
		this.tab.append(this.firstTr);
		for (var i = 0; i < arguments.length; i++) {
			this.thems[i] = document.createElement("th");
			this.thems[i].textContent = arguments[i];
			this.firstTr.append(this.thems[i]);
			let up = document.createElement("div");
			let down = document.createElement("div");
			up.textContent = "⬆️";
			down.textContent = "⬇️";
			this.thems[i].append(up);
			this.thems[i].append(down);
		}
		this.firstTr.addEventListener("click",function(event) {
			let target = event.target;
			if (target.nodeName.toLowerCase() == "div" && target.textContent == "⬆️") {
				thisTable.sortTableUp(target.parentNode,1);
			}else if (target.nodeName.toLowerCase() == "div" && target.textContent == "⬇️") {
				thisTable.sortTableUp(target.parentNode,0);
			}
			
		});
	}
	addTable(){
		//添加数据，自动生成总数
		let tr = document.createElement("tr");
		let greed = 0;
		this.tab.append(tr);
		
		if (arguments.length > 1) {
			for (var i = 0; i < arguments.length; i++) {
				let td = document.createElement("td");
			 	td.textContent = arguments[i];
			 	tr.append(td);
			 	if (i>0) {greed = greed + Number(arguments[i])}
			}
		}else{
			let array = arguments[0];
			for (var i = 0; i < array.length; i++) {

				let td = document.createElement("td");
			 	td.textContent = array[i];
			 	tr.append(td);
			 	if (i>0) {greed = greed + Number(array[i])}
			}
		}
		
		let td = document.createElement("td");
		td.textContent = greed;
		tr.append(td);
		td = document.createElement("td");
		let span1 = document.createElement("span");
		span1.textContent = "编辑";
		td.append(span1);
		let span2 = document.createElement("span");
		span2.textContent = "删除";
		td.append(span2);
		tr.append(td);
		span1.addEventListener("click",function() {
			let target = span1.parentNode.parentNode;
			if (span1.textContent == "编辑") {
				for (var i = 0; i < target.children.length-1; i++) {
					let content = target.children[i].textContent;
					target.children[i].textContent = "";
					let input = document.createElement("input");
					input.style.backgroundColor = "white";
	 				input.style.width = "60px";
	 				input.style.height = "30px";
	 				target.children[i].append(input);
	 				input.value = content;
				}
				span1.textContent = "保存"
			}else{
				for (var i = 0; i < target.children.length-1; i++) {
					let content = target.children[i].children[0].value;
					target.children[i].children[0].remove();
	 				target.children[i].textContent = content;

				}
				span1.textContent = "编辑"
			}
		})
		span2.addEventListener("click",function() {
			if(confirm("是否删除")){
				span1.parentNode.parentNode.remove();
			}
		});
	}
	editTable(location){
		let thisTable = this;
		let length = this.firstTr.children.length;
		let tr = document.createElement("tr");
		for (var i = 0; i < length-1; i++) {
			let td = document.createElement("td");
		 	let input = document.createElement("input");
		 	input.style.backgroundColor = "white";
		 	input.style.width = "60px";
	 		input.style.height = "30px";
		 	td.append(input);
		 	tr.append(td);
		}
		let td = document.createElement("td");
		let span1 = document.createElement("span");
		span1.textContent = "保存";
		td.append(span1);
		let span2 = document.createElement("span");
		span2.textContent = "取消";
		td.append(span2);
		tr.append(td);
		tr.id = "edit";
		tr.style.visibility = "hidden";
		if (location == "last") {
			this.tab.append(tr);
		}
		span1.addEventListener("click",function() {
			let target = span1.parentNode.parentNode;
			let content = [];	
			for (var i = 0; i < target.children.length-2; i++) {
				content.push(target.children[i].children[0].value);
			}
			thisTable.addTable(content);
			let lastTd = thisTable.tab.children[thisTable.tab.children.length-1];
			console.log(lastTd);
			target.before(lastTd);	
			thisTable.styleTable()		
		})
		span2.addEventListener("click",function() {
			tr.style.visibility = "hidden";
		})
	}
	sortTableUp(target,judge){
		//升序排序
		let location = 0;
		for (var i = 0; i < this.tab.children[0].children.length; i++) {
			if (target == this.tab.children[0].children[i]) {
				location = i;
				break;
			} 
		}
		for (var i = this.tab.children.length-2; i > 0; i--) {
			for (var j = 1; j < i; j++) {
				if (judge ==1) {
					if (this.tab.children[j].children[location].textContent > this.tab.children[j+1].children[location].textContent) {
						this.tab.children[j].before(this.tab.children[j+1]);
					}
				}else{
					if (this.tab.children[j].children[location].textContent < this.tab.children[j+1].children[location].textContent) {
						this.tab.children[j].before(this.tab.children[j+1]);
					}
				}
				
			}
		}
	}
	styleTable(){
		this.tab.style.margin = "10px auto";
		this.firstTr.style.position = "sticky";
		this.firstTr.style.top = "0";
		let tr = document.querySelectorAll("tr");
		for (var i = 0; i < tr.length; i++) {
			tr[i].style.border = "1px solid black";
		}
		let th = document.querySelectorAll("th");
		for (var i = 0; i < th.length; i++) {
			th[i].style.width = "100px";
			th[i].style.height = "60px";
			th[i].style.fontSize = "1rem";
			th[i].style.backgroundColor = "lightblue";
			th[i].style.border = "1px solid black";
		}
		let td = document.querySelectorAll("td");
		for (var i = 0; i < td.length; i++) {
			td[i].style.width = "80px";
			td[i].style.height = "40px";
			td[i].style.backgroundColor = "white";
			td[i].style.textAlign = "center";
			td[i].style.border = "1px solid black";
		}
		let div = document.querySelectorAll("th>div");
		for (var i = 0; i < div.length; i++) {
			// div[i].style.backgroundColor = "red";
			div[i].style.fontSize = ".7rem";
			div[i].style.display = "inline-block";
		}
		
	}
}

export{Table}