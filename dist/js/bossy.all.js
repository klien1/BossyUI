function CalendarController($scope){function getStandardTime(date){return{raw:date,year:date.getFullYear(),monthName:getMonthName(date.getMonth()),month:date.getMonth(),day:getDayName(date),date:date.getDate(),time:date.getTime()}}function getTimeObjectIfDate(date){return angular.isDate(new Date(date))?getStandardTime(new Date(date)):!1}function setConfigOptions(){$scope.config=$scope.config||{},$scope.config.start=getTimeObjectIfDate($scope.config.start),$scope.config.end=getTimeObjectIfDate($scope.config.end),options=angular.extend({},defaults,$scope.config)}function dayIsOutOfRange(_date){var hasRange=options.start&&options.end;return hasRange&&(_date.time<options.start.time||_date.time>options.end.time)?!0:options.start&&_date.time<options.start.time?!0:options.end&&_date.time>options.end.time?!0:void 0}function setSelectedDate(date){$scope.selected=getStandardTime(date),$scope.ngModel=$scope.selected.raw}function setCurrentMonthAndYear(month,year){var date=new Date(void 0!==year?year:$scope.selected.year,void 0!==month?month:$scope.selected.month,1);$scope.current=getStandardTime(date)}function getMonthName(month){return $scope.months[month]}function getDayName(date){return $scope.days[date.getDay()]}function initialize(){setConfigOptions(),setSelectedDate($scope.ngModel||new Date),setCurrentMonthAndYear(),$scope.updateDateMap()}var options={},defaults={},universal={DAY:864e5,HOUR:36e5};$scope.days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],$scope.months=["January","February","March","April","May","June","July","August","September","October","November","December"],$scope.previousMonth=function(){var date=new Date($scope.current.year,$scope.current.month-1,1);setCurrentMonthAndYear(date.getMonth(),date.getFullYear()),$scope.updateDateMap()},$scope.nextMonth=function(){var date=new Date($scope.current.year,$scope.current.month+1,1);setCurrentMonthAndYear(date.getMonth(),date.getFullYear()),$scope.updateDateMap()},$scope.selectDate=function(time){var date=getStandardTime(new Date(time));dayIsOutOfRange(date)||(date.month!==$scope.current.month&&(setCurrentMonthAndYear(date.month,date.year),$scope.updateDateMap()),setSelectedDate(new Date(time)))},$scope.updateDateMap=function(){var rawCurrentDay=$scope.current.raw.getDay()*universal.DAY,firstWeekDay=new Date($scope.current.time-rawCurrentDay),isMonthComplete=!1;for($scope.dateMap=[];!isMonthComplete;){var week=[];5===$scope.dateMap.length&&(isMonthComplete=!0);for(var weekDay=0;7>weekDay;weekDay++){var rawThisDate=firstWeekDay.getTime()+weekDay*universal.DAY,thisDate=new Date(rawThisDate);23===thisDate.getHours()?thisDate=new Date(thisDate.getTime()+universal.HOUR):1===thisDate.getHours()&&(thisDate=new Date(thisDate.getTime()-universal.HOUR));var date=getStandardTime(thisDate);date.dayInMonth=thisDate.getMonth()===$scope.current.raw.getMonth()?"day-in-month":"",date.disabledDay=dayIsOutOfRange(date)?"disabled-day":"",week.push(date)}firstWeekDay=new Date(firstWeekDay.getTime()+7*universal.DAY),$scope.dateMap.push(week)}},initialize()}function Calendar(){var template='<div class="calendarWrapper"><div class="calendarView"><table><thead><tr class="heading"><td ng-click="previousMonth()" title="Previous month" class="p"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-chevron-right-128.png" title="Previous Month" style="transform: rotate(180deg);" width="25"><i class="ionicon ion-chevron-down"></i></td><td colspan="5" class="calendar-month">{{current.monthName}} {{current.year}}</td><td ng-click="nextMonth()" title="Next month" class="p"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-chevron-right-128.png" title="Next Month" width="25"></td></tr></thead><tbody><tr class="week-days"><td ng-repeat="day in days" title="{{day}}">{{day | limitTo : 2}}</td></tr><tr ng-repeat="week in dateMap"><td ng-repeat="current in week" ng-click="selectDate(current.time)" class="{{current.dayInMonth}} {{current.disabledDay}} p">{{current.date}}</td></tr><tbody><tfooter><tr><td colspan="7">{{selected.day}}, {{selected.monthName}} {{selected.date}}, {{selected.year}}</td></tr></tfooter></table></div> <!-- / calendarView --><div class="btm-bar"><span class="date-selected"><strong>Start Date</strong>August 6th, 2015</span><i class="flip-over"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-chevron-right-128.png" title="Previous Month" width="25"></i></div> <!-- / Btm-Bar --></div> <!-- / calendarWrapper -->';return{restrict:"AE",scope:{config:"="},template:template,controller:CalendarController}}function ComboboxController($scope){function initialize(){1!=$scope.multi&&($scope.multi=!1)}$scope.list=$scope.config.list,$scope.selectedItems=[],$scope.title=$scope.config.title,$scope.inputText=$scope.config.inputText,$scope.sort=$scope.config.sort,$scope.multi=$scope.config.multi,$scope.deleteSelection=function(item){var index=$scope.selectedItems.indexOf(item);$scope.selectedItems.splice(index,1)},$scope.addSelection=function(item){0==$scope.multi&&($scope.selectedItems=[]),-1==$scope.selectedItems.indexOf(item)&&$scope.selectedItems.push(item)},$scope.sortFunction=function(x){return 1==$scope.sort?x:void 0},initialize()}function Combobox(){var template='<link rel="stylesheet" href="combobox.css"><div class="combo-box" ng-class="{\'open\': inFocus}" ng-blur="inFocus = false"><label for="combo-input" class="input-label">{{title}}</label><input id="combo-input" type="text" placeholder="{{inputText}}" ng-focus="inFocus = true" ng-model="inputField"><div class="inputs"><label class="pill" ng-repeat="item in selectedItems | orderBy: sortFunction" ng-click="deleteSelection(item)" ng-show={{multi}}>{{item}}<span class="close">&times;</span></label></div><div class="lists" ng-class="{\'is-active\': inFocus}"><ul><li ng-repeat="item in list | filter:inputField | orderBy: sortFunction"><a href="#!" title="{{item}}" ng-click="addSelection(item)">{{item}}</a></li></ul></div></div>';return{restrict:"AE",scope:{config:"="},template:template,controller:ComboboxController}}function Chart(){function _controller($scope,$filter){var config={max:0,height:200,width:200,xLabel:void 0,yLabel:void 0};$scope.config=angular.extend({},config,$scope.config),$scope.type=$scope.type||"bar",$scope.template=templates[$scope.type],"line"===$scope.type&&(config.max=$filter("orderBy")($scope.data,"-value")[0].value,angular.forEach($scope.data,function(line,index){line.x1=parseInt(index/$scope.data.length*config.width),line.y1=parseInt(($scope.data[index-1]?$scope.data[index-1].value:0)/config.max*config.height),line.x2=parseInt((index+1)/$scope.data.length*config.width),line.y2=parseInt(line.value/config.max*config.height)}))}var templates={base:'<div class="chart" style="width:{{width}}px; height:{{height}}px;">   <div class="y" style="width:{{height}}px;">{{yLabel}}</div>   <div class="x">{{xLabel}}</div></div>',line:'<svg style="width:{{config.width}}px; height:{{config.height}}px;">   <line        ng-repeat="line in data"        ng-attr-x1="{{line.x1}}"       ng-attr-y1="{{line.y1}}"       ng-attr-x2="{{line.x2}}"       ng-attr-y2="{{line.y2}}">   </line></svg>',dot:'<div   ng-repeat="dot in data"   class="dot"   style="bottom:{{dot.value / max * height}}px; left:{{($index + 0.5) / data.length * width}}px;"></div>',bar:'<svg style="width:{{config.width}}px; height:{{config.height}}px;">   <rect        ng-repeat="bar in data"       x="{{$index * (config.width / data.length)}}"       y="{{config.height - bar}}"       data-index="{{$index}}"       width="{{config.width / data.length}}"       height="{{bar}}"       style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"></svg>'};return _controller.$inject=["$scope","$filter"],{restrict:"E",replace:!0,scope:{type:"@",config:"=",data:"="},template:templates.base,compile:function(element,attrs){var type=attrs.type||"bar";element.html(templates[type])},controller:_controller}}function TooltipController($scope){function initialize(){$scope.data.text||$scope.options.transclude===!0||console.error("You must include content for tool tip."),$scope.options||($scope.options={align:"center",position:"top",color:"black",type:"default",transclude:!1,persist:!1,progress:"0",icon:"",iconFloat:"left"})}$scope.setAlignment=function(alignment){var alignmentClass="";return alignment&&("left"===alignment.toLowerCase()?alignmentClass="bossy-tooltip-align-left":"right"===alignment.toLowerCase()&&(alignmentClass="bossy-tooltip-align-right")),alignmentClass},$scope.setActive=function(persist){var activeClass="";return persist&&(activeClass="active"),activeClass},$scope.setPositioning=function(position){var positionClass="";return position&&("left"===position.toLowerCase()?positionClass="bossy-tooltip-pos-left":"right"===position.toLowerCase()?positionClass="bossy-tooltip-pos-right":"bottom"===position.toLowerCase()&&(positionClass="bossy-tooltip-pos-bottom")),positionClass},$scope.setContentType=function(type){var contentType="";return type&&("html"===type.toLowerCase()?contentType="content-html":"download"===type.toLowerCase()&&(contentType="download")),contentType},$scope.setIconFloat=function(direction){var iconDirection="";return direction&&("left"===direction.toLowerCase()?iconDirection="icon-left":"right"===direction.toLowerCase()&&(iconDirection="icon-right")),iconDirection},initialize()}function Tooltip(){return{restrict:"E",scope:{data:"=",options:"="},controller:TooltipController,transclude:!0,link:function(scope,elem,attr){if(scope.options.transclude===!0){for(var tooltipHtml=elem.find("div"),index=0;tooltipHtml.length&&!tooltipHtml.hasClass("tooltip-content");)tooltipHtml=tooltipHtml.find("div"),index++;tooltipHtml.length&&(scope.data.text=tooltipHtml.html(),tooltipHtml[index].remove()),scope.data.text||console.error("You must include content for tool tip.")}},template:'<span class="bossy-tooltip"><span class="link"><ng-transclude></ng-transclude><div class="bossy-tooltip-active {{options.color.toLowerCase()}} {{setActive(options.persist)}} {{setAlignment(options.align)}} {{setContentType(options.type)}} {{setPositioning(options.position)}}"><span ng-bind-html="data.text | bossyUnsafeHtml"></span><i ng-show="options.icon" class="icon ionicon {{options.icon.toLowerCase()}} {{setIconFloat(options.iconFloat)}}"></i><div ng-show="options.type.toLowerCase() === \'download\'" class="progress-bar" style="width: {{options.progress}}%"></div></div></span></span>'}}angular.module("bossy.filters",[]).filter("bossyUnsafeHtml",function($sce){return function(val){return $sce.trustAsHtml(val)}});var bossy=angular.module("bossy",["bossy.filters","bossy.calendar","bossy.data","bossy.form","bossy.graph","bossy.input","bossy.schema","bossy.tooltip","bossy.autocomplete","bossy.combobox"]);angular.module("bossy.data",[]).factory("$data",["$q","$http","$scope",function($q,$http,$scope){function _getData(data){return angular.isString(data)?_getRemoteData(data):angular.isObject(data)?data:angular.isFunction(data)?_getData(data.call($scope)):void console.error("directive.bossyForm: no data url or object given")}function _getRemoteData(data){var deferred=$q.defer();return $http.get(data,{responseType:"json"}).success(function(data){angular.isObject(data)?deferred.resolve(data):deferred.reject("directive.bossyForm: GET request to url did not produce data object")}).error(function(responseData,status){deferred.reject('directive.bossyForm: GET request to url "'+data+'" failed with status "'+status+'"')}),deferred.promise}return{getData:_getData}}]),angular.module("bossy.schema",[]).factory("$schema",["$q","$http",function($q,$http){function _getSchema(schema){return angular.isString(schema)?_getRemoteSchema(schema):angular.isObject(schema)?schema:void console.error("directive.bossyForm: no schema url or object given")}function _getRemoteSchema(schema){var deferred=$q.defer();return $http.get(schema).success(function(data){angular.isObject(data)?deferred.resolve(data):deferred.reject("directive.bossyForm: GET request to url did not produce schema object")}).error(function(data,status){deferred.reject('directive.bossyForm: GET request to url "'+schema+'" failed with status "'+status+'"')}),deferred.promise}return{getSchema:_getSchema}}]),angular.module("bossy.autocomplete",[]).service("utility",function(){this.createMatrix=function(x,y){var i,mat=new Array(x);for(i=0;x>i;i++)mat[i]=new Array(y);return mat},this.filterStartsWith=function(words,query,caseInsensitive){var compare;return compare=caseInsensitive?function(w){return w.toLowerCase().startsWith(query.toLowerCase())}:function(w){return w.startsWith(query)},words.filter(compare)}}).factory("BKTree",["utility",function(utility){function levDist(str1,str2){var i,j,mat=utility.createMatrix(str1.length+1,str2.length+1);for(str1=" "+str1.toLowerCase(),str2=" "+str2.toLowerCase(),i=0;i<str1.length;i++)mat[i][0]=i;for(j=0;j<str2.length;j++)mat[0][j]=j;for(j=1;j<str2.length;j++)for(i=1;i<str1.length;i++)mat[i][j]=str1[i]===str2[j]?mat[i-1][j-1]:Math.min(mat[i-1][j]+1,mat[i][j-1]+1,mat[i-1][j-1]+1);return mat[str1.length-1][str2.length-1]}function buildBKTree(dict){var i,root=dict.length>0?new BKTreeNode(dict[0]):null;for(i=1;i<dict.length;i++)root.add(new BKTreeNode(dict[i]));return root}function searchBKTree(root,query,tolerance){var dist,matchObj={},matches=[];for(dist=0;tolerance>=dist;dist++)matchObj[dist]=[];for(root.search(query,tolerance,matchObj),dist=0;tolerance>=dist;dist++)matches=matches.concat(matchObj[dist]);return matches}var BKTreeNode=function(str){this.str=str,this.children={}};return BKTreeNode.prototype={add:function(newNode){var dist;newNode.str!==this.str&&(dist=levDist(newNode.str,this.str),void 0===this.children[dist]?this.children[dist]=newNode:this.children[dist].add(newNode))},search:function(query,tolerance,matchObj){var i,dist=levDist(query,this.str);for(tolerance>=dist&&matchObj[dist].push(this.str),i=dist-tolerance>0?dist-tolerance:0;dist+tolerance>=i;i++)this.children[i]&&this.children[i].search(query,tolerance,matchObj)}},function(dict){this._root=buildBKTree(dict),this.query=function(query,tolerance){return this._root?searchBKTree(this._root,query,tolerance):[]}}}]).directive("bossyAutocomplete",["BKTree","utility",function(BKTree,utility){return{restrict:"E",replace:!0,scope:{dict:"=",maxCorrections:"=?",maxSuggestions:"=?"},link:function(scope,element,attrs){scope.maxCorrections=scope.maxCorrections||0,scope.maxSuggestions=scope.maxSuggestions||5,scope.tree=new BKTree(scope.dict),scope.suggestions=[],scope.updateSuggestions=function(query){var startsWithMatches=utility.filterStartsWith(scope.dict,query,!0),correctionMatches=scope.tree.query(query,scope.maxCorrections);scope.suggestions=query.length>0?Array.from(new Set(startsWithMatches.concat(correctionMatches))):[]},scope.chooseSuggestion=function(suggestion){scope.query=suggestion,scope.updateSuggestions(suggestion)}},template:'<div>  <input ng-model="query" ng-change="updateSuggestions(query)">  <div ng-repeat="sug in suggestions" ng-click="chooseSuggestion(sug)">{{sug}}</div></div>'}}]),Calendar.$inject=[],CalendarController.$inject=["$scope"],angular.module("bossy.calendar",[]).controller("bossyCalendarController",CalendarController).directive("bossyCalendar",Calendar),angular.module("bossy.combobox",[]).directive("bossyCombobox",Combobox),angular.module("bossy.form",[]).run(function($templateCache){$templateCache.put("bossy-input.html","templates/bossy-input.html")}).directive("bossyForm",["$compile","$http","$schema","$data",function($compile,$http,$schema,$data){function setData(data){var result=$data.getData(data);return angular.isFunction(result.then)&&angular.isFunction(result["catch"])&&angular.isFunction(result["finally"])?result:void(_data=result)}function setSchema(schema){_schema=$schema.getSchema(schema)}function buildTemplate(schemaPart,parentKey,required){var template="",fullKey="";return angular.forEach(schemaPart,function(value,key){if(value.type)switch(console.log(fullKey+" is "+value.type),value.type){case"object":var requiredList="undefined"!=typeof value.required?value.required:null;template+=buildTemplate(value.properties,fullKey,requiredList);break;case"array":template+=buildTemplate(value.items.properties,fullKey);break;case"number":template+=_itemTemplate.number(value);break;case"string":var isRequired=!1;required&&-1!==required.indexOf(key)&&(isRequired=!0),template+=_itemTemplate.text(value,key,isRequired);break;case"boolean":template+=_itemTemplate.checkbox(value)}},this),template}var _schema,_data,_options={showLabels:!0,header:"This is header",footer:"This is footer",theme:"green",button:"Save"},_itemTemplate={number:function(){return'<input type="number"/>'},text:function(obj,key,isRequired){return"<bossy-input title=\"'"+obj.title+"'\" type=\"'"+obj.inputType+"'\" value=\"'"+_data.address[key]+"'\""+(isRequired?" required":"")+"></bossy-input>"},textArea:function(){return"<textarea></textarea>"},checkbox:function(obj){return'<div class="checkbox"><label><input type="checkbox">'+obj.title+"</label></div>"}};return{restrict:"E",replace:!0,template:"",scope:{config:"=",title:"="},link:function(scope,element,attributes){scope.config.options=angular.extend(_options,scope.config.options);var promise=setData(scope.config.data);setSchema(scope.config.schema),promise?(promise.then(function(result){_data=result,element.html('<form novalidate class="{{config.options.theme}}"><div class="banner page-header"><h3>{{config.options.header}}</h3></div>'+buildTemplate(_schema)+'<button ng-if="config.options.button">{{config.options.button}}</button><div class="page-footer"><h3>{{config.options.footer}}</h3></div></form>'),$compile(element.contents())(scope)},function(reason){}),element.html('<form novalidate class="{{config.options.theme}}">LOADING...</form>'),$compile(element.contents())(scope)):(element.html('<form novalidate class="{{config.options.theme}}"><div class="banner page-header"><h3>{{config.options.header}}</h3></div>'+buildTemplate(_schema)+'<button ng-if="config.options.button">{{config.options.button}}</button><div class="page-footer"><h3>{{config.options.footer}}</h3></div></form>'),$compile(element.contents())(scope))}}}]),Chart.$inject=[],angular.module("bossy.graph",[]).directive("bossyGraph",Chart),function(){function Input($compile){function _controller($scope,$filter){var config={maxLength:0,height:200,width:200,type:"text",value:"",title:"title",currentLength:0};$scope.config=angular.extend({},config,$scope.config),$scope.data=$scope.config.value,$scope.valueChange=function(val){$scope.config.currentLength>=$scope.config.max&&($scope.config.value=$scope.config.value.substring(0,$scope.config.max-1)),$scope.config.currentLength=val.length}}var templateDefault='<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> </div> </fieldset>',templatePrefix='<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input class="prefix" type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> <span class="bossy-input-component bossy-input-prefix">{{config.prefixContent}}</span> </div> </fieldset>',templatePostfix='<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input class="postfix" type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> <span class="bossy-input-component bossy-input-postfix">{{config.postfixContent}}</span> </div> </fieldset>',templateCounter='<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <span class="counter"><span class="inc">{{config.currentLength}}</span>/{{config.max}}</span> <input class="postfix" type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}" ng-model="config.value" ng-change="valueChange(config.value)"/> <span></span> <span class="bossy-input-component bossy-input-postfix">{{config.postfixContent}}</span> </div> </fieldset>',getTemplate=function(templateType){var template="";switch(templateType){case"prefix":template=templatePrefix;break;case"postfix":template=templatePostfix;break;case"counter":template=templateCounter;break;default:template=templateDefault}return template};return _controller.$inject=["$scope","$filter"],{restrict:"E",replace:!0,scope:{config:"="},link:function(scope,element,attrs){element.html(getTemplate(scope.config.templateType)),$compile(element.contents())(scope)},template:templateDefault,controller:_controller}}Input.$inject=["$compile"],angular.module("bossy.input",[]).directive("bossyInput",Input)}(),Tooltip.$inject=[],TooltipController.$inject=["$scope"],angular.module("bossy.tooltip",["bossy.filters"]).controller("bossyTooltipController",TooltipController).directive("bossyTooltip",Tooltip);
//# sourceMappingURL=../maps/bossy.all.js.map
