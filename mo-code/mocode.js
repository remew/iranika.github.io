const elem = {
  view : document.getElementById("view"),
  more : document.getElementById("more"),
  footer:document.getElementById("footer"),
}
var page = {
  current : 0,
  length : pageData.length -1,
}
var conf = {
  isAutoShowMore : true
}

window.onload = () => {
  //document.getElementById("view").innerHTML = ""
  initShowImage(page.current) //モーダルに最初から読むを実装したため、初期化処理からは除外

  viewer.addTitleToSideBar("rightMenu")
  
  //続きを表示が押されたときの処理
  elem.more.onclick = ()=>{
    showMore()
  }

  var triggerMargin = 5
  //sub funcions
  window.addEventListener("scroll", function(){
    //console.log(elem.footer.getBoundingClientRect().bottom)
    if (!conf.isAutoShowMore){ return }
    if (triggerMargin > elem.footer.getBoundingClientRect().bottom - window.innerHeight){
      showMore()      
    }
  })
}

function showMore(){
  if (page.length >= page.current){
    showHiddenImage()
    addHiddenImage(page.current + 1)
    page.current += 1  
  }
}

function initShowImage(pageNum){
  elem.view.innerHTML = ""
  addHiddenImage(pageNum)
  showHiddenImage()
  addHiddenImage(pageNum + 1)
  page.current = pageNum + 1
  viewer.closeRightMenu()
}

function lastShowImage(){
  initShowImage(page.length)
}

function showHiddenImage(){
  var elems = document.querySelectorAll(".hidden-image")
  if (elems.length != 0){
    [].forEach.call(elems,(elem) => {
      elem.className = elem.className.replace("hidden-image", "")
    });
  }
}

function addHiddenImage(pageNum){
  if (pageNum > page.length){
    return
  }
  var pg = pageData[pageNum]
  pg.ImagesUrl.forEach(img_url => {
    elem.view.innerHTML += `<img class="hidden-image" src="${img_url}">`
  })
}

