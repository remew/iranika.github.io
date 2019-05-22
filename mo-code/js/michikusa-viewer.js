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
      isAutoShowMore : true,
      tweetText: encodeURI("ここすき\n#みちくさびゅあー"),
      tweetHashTag: encodeURI(""),
      tweetUrl: encodeURI("http://yurika.iranika.info/mo-code/")
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
      viewer.elem.view.innerHTML += `<a class="tweetbtn hidden-image" href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fpublish.twitter.com%2F%3FbuttonText%3D%25E3%2581%2593%25E3%2581%2593%25E3%2581%2599%25E3%2581%258D%25EF%25BC%2581%25EF%25BC%2581%2523%25E3%2581%25BF%25E3%2581%25A1%25E3%2581%258F%25E3%2581%2595%25E3%2581%25B3%25E3%2582%2585%25E3%2581%2582%25E3%2583%25BC%26buttonType%3DTweetButton%26buttonUrl%3Dhttps%253A%252F%252Fyurika.iranika.info%252Fmo-code%252F%252310%26dnt%3D1%26lang%3Dja%26widget%3DButton&ref_src=twsrc%5Etfw&text=%E3%81%93%E3%81%93%E3%81%99%E3%81%8D%EF%BC%81%EF%BC%81%23%E3%81%BF%E3%81%A1%E3%81%8F%E3%81%95%E3%81%B3%E3%82%85%E3%81%82%E3%83%BC&tw_p=tweetbutton&url=https%3A%2F%2Firanika.github.io%2Fmo-code%2F%23${pageNum +1}"><span class="label">ツイートする</span></a>`
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

