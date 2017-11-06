( function MyApp(){
  var btn = document.getElementById('btnGetData');
  btn.addEventListener(RetriaveData(document.getElementById('urlLink').value));

}());
function RetriaveData(url){

 if(!url){
   alert('You need to fill url filed first.');
   return;
 }
   var fetchedData = fetch(url).then(function(response) {
     return response.json();
   }).then(data => {
     renderInterface(data);
   }).catch(error => alert(error));
 }
  
 function renderInterface( data ){
  
   console.log('do some stuff with data:', data);
   var arr1 = createArray1(data);
   var arr2 = createArray2(data);
   var arr3 = createArray3(data);
   RenderResultLists(arr1, arr2, arr3)
 }
  
 function createArray1( data ){
   return arr1 = data.filter( item => {
     return item.favoriteFruit.toLowerCase() === 'banana';
   });
 }
  
 function createArray2( data ){
   return arr1 = data.filter( item => {
     return Number(item.balance.replace(/[^0-9\.-]+/g,"")) > 2000 && item.age > 25;
   });
 }
  
 function createArray3( data ){
   return arr1 = data.filter( item => {
     return item.eyeColor.toLowerCase() === 'blue' && item.gender.toLowerCase() === 'female' && item.isActive === false;
   });
 }
  
 function RenderResultLists(...props){
  
   var RenderList_fn = function( listArray ){
     listArray.map( (item) => {
       let newElement = document.createElement('div');
         newElement.innerHTML = '<div>' + item.name + '</div>';
         RenderList.appendChild(newElement);
     });
   };
  
   var RenderList = document.getElementById('searchResult');
   console.log('props', ...props);
   debugger;
   props.forEach(item => {
     RenderList_fn(item);
   });
 }