function requestPosts() {

  const list = document.querySelector(".news-links")
  
  fetch("https://www.reddit.com/r/upliftingnews/new.json?limit=10")
     .then(listing => listing.json())
     .then(listing => listing.data.children)
     .then(listing =>
       listing.map(x => {
         //if the post is made by a user with no actual link to a news story, this if statement filters it out
         if (x.data.domain != "self.UpliftingNews") {
           //using back-ticks and ES6 template variables to barf out the structure of the page
           list.innerHTML += `<article>
     
                                   <div class="story-link">
                                     <a href="${x.data.url}">${x.data.title}</a>
                                       <div class="sources">
                                         <a href="http://www.reddit.com${x.data.permalink}"><img src="images/RedditLogo.svg">Reddit Thread</a>
                                         <a href="http://www.${x.data.domain}">(Source)</a>
                                       </div>
                                       <div class="share-btns">
                                        <a href="http://twitter.com/intent/tweet?status=${x.data.title}+${x.data.url}" target="_blank"><img src="images/twitter.svg"></a>
                                        <a href="https://plus.google.com/share?url=${x.data.url}" target="_blank"><img src="images/google-plus.svg"></a>
                                        <a href="http://www.facebook.com/share.php?u=${x.data.url}&title=${x.data.title}" target="_blank"><img src="images/facebook.svg"></a>  
                                       </div>
                                   </div>
     
                                   <div class="thumbnails">    
                                     <a href="${x.data.url}">
                                     <img src="${x.data.thumbnail}" alt="">
                                     </a>
                                   </div>
     
                                </article>`;
         }
       }) 
     );
}


//using this to display month, date and day on homepage
const daysOfTheWeek = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
  "_"
)

const date = new Date();
const theMonth = date.getMonth();
const theDate = date.getDate();
const day = date.getDay();

window.onload = function() {

requestPosts()
 
  const dateDisplay = document.querySelector(".day-and-date");
  //ES6 template variables to add a date and day to the header of the page
  dateDisplay.innerHTML = `<h4>
                            <span class="date">${theMonth + 1}/${theDate}</span>
                            <span class="day">${daysOfTheWeek[day]}</span>
                           </h4>`;
                                                           
};



 