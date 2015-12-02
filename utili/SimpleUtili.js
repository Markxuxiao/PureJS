
/**
 * 查找class节点
 * @param {string} className 类名
 * @param {HTMLElement} element 元素缩小查找范围,非必要
 * @return {object} NodeList
 */
function getElementsByClassName (className, element) {
	element?element:element=document;
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(className);
    }else{
        var results = new Array();
        var elems = element.getElementsByTagName("*");
        for (var i=0; i<elems.length;i++) {
            if (elems.className.indexOf(className) != -1){
                results[results.length] = elems;
            }
        }
        return results;
    }
}
/**
* 判断是否有某个className
* @param {HTMLElement} element 元素
* @param {string} className className
* @return {boolean}
*/
function hasClass(element, className) {
    var classNames = element.className;
    if (!classNames) {
        return false;
    }
    classNames = classNames.split(/\s+/);
    for (var i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === className) {
            return true;
        }
    }
    return false;
}

/**
* 添加className
*
* @param {HTMLElement} element 元素
* @param {string} className className
*/
function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className = element.className ?[element.className, className].join(' ') : className;
    }
}
/**
* 删除元素className
*
* @param {HTMLElement} element 元素
* @param {string} className className
*/
function removeClass(element, className) {
    if (className && hasClass(element, className)) {
        var classNames = element.className.split(/\s+/);
        for (var i = 0, len = classNames.length; i < len; i++) {
            if (classNames[i] === className) {
                classNames.splice(i, 1);
                break;
            }
        }
    }
    element.className = classNames.join(' ');
}

/**
 * 判断是否是兄弟元素
 *
 * @param {HTMLElement} element html元素
 * @param {HTMLElement} siblingNode 判断元素
 * @return {boolean}
 */
function isSiblingNode(element, siblingNode) {
    for (var node = element.parentNode.firstChild; node; node = node.nextSibling) {
        if (node === siblingNode) {
            return true;
        }
    }
    return false;
}

//js事件相关

var eventUtil = {
	/**
	 * 添加事件绑定
	 * @param {object} 节点元素
	 * @param {string} 事件名称，不加on
	 * @param {function} 事件执行的函数
	 */
	addHandler : function (element,type,handler) {
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type] = handler;
		}


	},
	//删除事件
	removeHandler : function (element,type,handler) {
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,handler);
		}else{
			element['on'+type] = null;
		}
	},
	//获取事件对象
	getEvent : function (event) {
		return event ? event : window.event; 
	},
	//获取事件类型
	getType : function (event) {
		return event.type; 
	},
	//获取绑定事件的元素
	getElement : function (event) {
		return event.target || event.srcEelment;
	},
	//阻止默认事件
	preventDefault : function (event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else{
			event.returnValue = false;
		};
	},
	//阻止事件冒泡
	stopPropagation : function (event) {
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}


}