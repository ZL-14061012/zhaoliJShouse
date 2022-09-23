// import { Dashboard } from '/dashboard.js'; 

// const dashboard_1 = new Dashboard(); 
// const dashboard_2 = new Dashboard(); 

// dashboard_1.loadDashboard();
// dashboard_2.loadDashboard();
//1.把子类中共有的属性和方法抽取出，定义一个父类Stu 
function Stu(name,age){ 
    //window.alert("确实被调用."); 
    this.name=name; 
    this.age=age; 
    this.show=function(){ 
        window.alert(this.name+"年龄是="+this.age); 
    } 
} 
//2.通过call或者apply来继承父类的属性的方法 
function MidStu(name,age){ 
    //这里这样理解: 通过call修改了Stu构造函数的this指向, 
    //让它指向了调用者本身. 
    Stu.call(this,name,age); 
    //如果用apply实现，则可以 
    //Stu.apply(this,[name,age]); //说明传入的参数是 数组方式 
    //可以写MidStu自己的方法. 
    this.pay=function(fee){ 
        window.alert("你的学费是"+fee*0.8); 
    } 
} 
function Pupil(name,age){ 
    Stu.call(this,name,age);//当我们创建Pupil对象实例,Stu的构造函数会被执行,当执行后，我们Pupil对象就获取从 Stu封装的属性和方法 
    //可以写Pupil自己的方法. 
    this.pay=function(fee){ 
        window.alert("你的学费是"+fee*0.5); 
    } 
} 
//测试 
var midstu=new MidStu("zs",15); 
var pupil=new Pupil("ls",12); 
midstu.show(); 
midstu.pay(100); 
pupil.show(); 
pupil.pay(100); 