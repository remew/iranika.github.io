//viewerの定義
const viewer = {
  elem : {
    view : document.getElementById("view"),
    more : document.getElementById("more"),
    footer : document.getElementById("footer"),
    rightMenu : document.getElementById("rightMenu"),
  },
  conf : {
    isAutoShowMore : true
  },
  pageData : pageData,
  page : {
    current : 0,
    length : pageData.length -1,
  },
  openRightMenu : (element=viewer.elem.rightMenu)=>{
    element.style.display = "block";
  },
  closeRightMenu : (element=viewer.elem.rightMenu)=>{
    element.style.display = "none";
  },
  addTitleToSideBar : (element=viewer.elem.rightMenu)=>{
    viewer.pageData.forEach((item, index) => {
      element.innerHTML += viewer.sidevarItem(index, item)
    })
  },
  sidevarItem : (index, item)=>{
    return `<a href="#" class="w3-bar-item w3-button" onclick="viewer.initShowImage(${index})">${index}. ${item.Title}</a>`
  },
  showMore : ()=>{
    if (viewer.page.length >= viewer.page.current){
      viewer.showHiddenImage()
      viewer.addHiddenImage(viewer.page.current + 1)
      viewer.page.current += 1  
    }
  },
  initShowImage : (pageNum)=>{
    viewer.elem.view.innerHTML = ""
    viewer.addHiddenImage(pageNum)
    viewer.showHiddenImage()
    viewer.addHiddenImage(pageNum + 1)
    viewer.page.current = pageNum + 1
    viewer.closeRightMenu()
  },
  lastShowImage: ()=>{
    viewer.initShowImage(viewer.page.length)
  },
  showHiddenImage : ()=>{
    var elems = document.querySelectorAll(".hidden-image")
    if (elems.length != 0){
      [].forEach.call(elems,(elem) => {
        elem.className = elem.className.replace("hidden-image", "")
      });
    }
  },
  addHiddenImage : (pageNum)=>{
    if (pageNum > viewer.page.length){
      return
    }
    viewer.pageData[pageNum].ImagesUrl.forEach(img_url => {
      viewer.elem.view.innerHTML += `<img class="hidden-image" src="${img_url}">`
    })
  }
}

window.onload = ()=>{
  viewer.initShowImage(viewer.page.current)
  viewer.addTitleToSideBar(viewer.elem.rightMenu)
  var triggerMargin = 5
  //sub funcions
  window.addEventListener("scroll", function(){
    //console.log(elem.footer.getBoundingClientRect().bottom)
    if (!viewer.conf.isAutoShowMore){ return }
    if (triggerMargin > viewer.elem.footer.getBoundingClientRect().bottom - window.innerHeight){
      viewer.showMore()  
    }
  })
}

