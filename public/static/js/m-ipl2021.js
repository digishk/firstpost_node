if(checkElement('iplSlider')){
  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      var iplglide = new Glide('#iplSlider',{
        type: 'slider',
        perView: 1,
        rewind: true
      });
      iplglide.mount()
    },3000)
})     

}

if(checkElement('iplstoriesSlider')){
  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      var iplstories = new Glide('#iplstoriesSlider',{
        type: 'slider',
        perView: 1,
        rewind: true
      });
      iplstories.mount()
    },3000)
  })    
}
     
if(checkElement('coSlider')){
  var coglide = new Glide('#coSlider',{
    type: 'slider',
    perView: 1,
    rewind: true
  });
  
  coglide.mount()
} 

if(checkElement('cricketScore')){
  var asoglide = new Glide('#asoSlider',{
    type: 'slider',
    perView: 2,
    rewind: true
  });
  
  asoglide.mount()
} 