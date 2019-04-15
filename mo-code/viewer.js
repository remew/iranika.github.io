//configure
const id = {
  rightMenu : "rightMenu"
}

//viewer class
class viewer {
  constructor(){
    addTitleToSideBar(id.rightMenu)
  }
  
  static openRightMenu() {
    document.getElementById(id.rightMenu).style.display = "block";
  }
  
  static closeRightMenu() {
    document.getElementById(id.rightMenu).style.display = "none";
  }
  
  static addTitleToSideBar(elementId){
    var sidevarElement = document.getElementById(elementId)
    pageData.forEach((item, index) => {
      let addChild = this.sidevarItem(index, item)
      sidevarElement.innerHTML += addChild
    })
  }
  static sidevarItem(index, item){
    return `<a href="#" class="w3-bar-item w3-button" onclick="initShowImage(${index})">${index}. ${item.Title}</a>`
  }
  
}
