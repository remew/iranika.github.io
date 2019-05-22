//viewerObjectの定義
const viewer = (()=>{
  return {
    /* Properties */
    elem : { //Viewer関連のElementsObject
      view : document.getElementById("view"),
      more : document.getElementById("more"),
      footer : document.getElementById("footer"),
      rightMenu : document.getElementById("rightMenu"),
    },
    conf : { //Viewer関連の設定情報
      isAutoShowMore : true
    },
    pageData : pageData,
    page : { //pageに関する変数
      length : pageData.length -1,
      _current : 0,
      get current(){
        return this._current
      },
      set current(pageNum){
        if (pageNum > viewer.page.length){
          viewer.elem.more.style.display = "none";
        }else{
          viewer.elem.more.style.display = "block";
        }
        this._current = pageNum
      },
    },
    /* Methods */
    openRightMenu : (element=viewer.elem.rightMenu)=>{
      element.style.display = "block";
    },
    closeRightMenu : (element=viewer.elem.rightMenu)=>{
      element.style.display = "none";
    },
    addTitleToElement : (element=viewer.elem.rightMenu)=>{
      viewer.pageData.forEach((item, index) => {
        element.innerHTML += viewer.createMenuItem(index, item)
      })
    },
    createMenuItem : (index, item)=>{
      return `<a href="#" class="w3-bar-item w3-button" onclick="viewer.initShowImage(${index})">${index +1}. ${item.Title}</a>`
    },
    showMore : ()=>{
      if (viewer.page.length >= viewer.page.current){
        viewer.showHiddenImage()
        viewer.addHiddenImage(viewer.page.current + 1)
        viewer.page.current += 1  
      }
    },
    isLastPage : (pageNum)=>{
      if (viewer.page.length == pageNum){ return true}
      else { return false}
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
      if (pageNum > viewer.page.length){ return }
      viewer.pageData[pageNum].ImagesUrl.forEach(img_url => {
        viewer.elem.view.innerHTML += `<img class="hidden-image" src="${img_url}">`
      })
      viewer.elem.view.innerHTML += `<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button hidden-image" data-text="ここすき！！" data-url="https://yurika.iranika.info/mo-code/index.html#${pageNum +1}" data-hashtags="#みちくさびゅあー" data-lang="ja" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`
    }
  }
})();

window.onload = ()=>{
  hash = location.hash.replace("#", "")
  if (isNaN(hash) || hash == ""){
    document.getElementById("modal").style.display = "block"　//モーダルの表示
    viewer.initShowImage(viewer.page.current)
  }else{
    viewer.initShowImage(parseInt(hash) -1) //話数と合わせるために-1する
  }
  viewer.addTitleToElement(viewer.elem.rightMenu)
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

