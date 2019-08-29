var basicContainer=0;
var nextNumber = 3;
var isOpenedOptionsDropdown = false;

//toggle option button in profile
function toggleOptionButton(){
	if(isOpenedOptionsDropdown == false){
		let x = document.getElementById('container-profile-options-dropdown');
		x.style.display = "block";
		isOpenedOptionsDropdown = true;
	}else{
		let x = document.getElementById('container-profile-options-dropdown');
		x.style.display = "none";
		isOpenedOptionsDropdown = false;
	}
}

window.onload = loadFunction;
function loadFunction(){
	//loading containers
	loadContainers();

	//for notifications
	let notFrame = document.getElementById('container-notification-frame');
	if(notFrame){
		if(notFrame.style.display == "block"){
			setTimeout(function(){toggleNotification(-1);},2500);
		}
	}

	//for activating profile-options-dropdown list
	$("[name='profile-option-button']").click(toggleOptionButton);

}

var today;

function getDate(){
	today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;
}

function reloadPage(){
	if(isFullContainerOpen == false && isOpenedProfile == false){
		//window.location.reload();
		window.location = "index.php";
	}
}

var getContainerTitle;
var getContainerContent;
var getContainerAuthor;

function loadContainers(){
	getContainerTitle = document.getElementsByName('_titleName')[0];
	getContainerContent = document.getElementsByName('_textName')[0];
	getContainerAuthor = document.getElementsByName('_authorName')[0];
}

var nextContainerNumber = 2;

function addContainer(){
	getContainerTitle.style.backgroundColor = "#f8f8f8";
	getContainerContent.style.backgroundColor= "#f8f8f8";
	getContainerAuthor.style.backgroundColor= "#f8f8f8";
	var proceed = true;
	if(getContainerTitle.value == ""){
		proceed = false;
		getContainerTitle.style.backgroundColor = "salmon";
	}
	if(getContainerContent.value == ""){
		proceed = false;
		getContainerContent.style.backgroundColor = "salmon";
	}
	if(getContainerAuthor.value == ""){
		proceed = false;
		getContainerAuthor.style.backgroundColor = "salmon";
	}
	if(proceed == false){
		//toggleNotification(2);
		//setTimeout(function(){toggleNotification(-1);},2500);
	}else{
		if(isFullContainerOpen == false && isOpenedProfile == false){
			//modify basisContainer's h1
			var localParent = basicContainer.getElementsByTagName('div')[0];
			localParent.getElementsByTagName('h2')[0].innerHTML;//=getContainerInput.value;
			nextNumber++;
			var newEl = basicContainer.cloneNode(true);
			var newTitle = newEl.getElementsByTagName('div')[0];
			var newContent = newEl.getElementsByTagName('div')[1];
			newEl.setAttribute("name",nextContainerNumber);
			nextContainerNumber++;
			getDate();
			newTitle.getElementsByTagName('h2')[0].innerHTML = getContainerTitle.value;
			newTitle.getElementsByTagName('h3')[0].innerHTML = "By " + getContainerAuthor.value + " on " + today;
			newContent.getElementsByTagName('p')[0].innerHTML = getContainerContent.value;
			//adding the new container
			//document.getElementById('content').appendChild(newEl);
			var lastDiv = document.getElementById('container-full-frame');
			document.getElementById('content').insertBefore(newEl,lastDiv);
			//checking height of addContainer
			var newElHeight = newContent.offsetHeight;
			if(newElHeight>=250){
				//add "..."
				//alert(newElHeight);

				//first it is removed
				var select = document.getElementById('content');
	  		select.removeChild(select.lastChild);
				//then changed
				newEl.offsetHeight = 250;
				//newContent.getElementsByTagName('p')[0].innerHTML = getContainerContent.value.trim();
				//then added again
				var dots = newEl.getElementsByTagName('div')[1];
				dots.getElementsByTagName('p')[0].innerHTML = dots.getElementsByTagName('p')[0].innerHTML + "...";
				document.getElementById('content').insertBefore(newEl,lastDiv);
			}
			//updating database
			var result = "<?php echo('salami');?>";
			//closing the form
			cancelArticle();
			//showing notification
			//toggleNotification(0);
			//setTimeout(function(){toggleNotification(-1);},2500);

		}
	}
}

function toggleNotification(number){
	var x = document.getElementById('container-notification-frame');
	if(x){
		$(x).fadeOut(1200);
		if(typeof window.history.pushState == 'function') {
        window.history.pushState({}, "Hide", "http://localhost/socialCrushrApp/index.php");
    }
	}
}

function deleteContainer(){
	if(isFullContainerOpen == false && isOpenedProfile == false){
		var parent = document.getElementById('content');
		var child = parent.getElementsByTagName('div')[0];

		parent.removeChild(child);

		toggleNotification(1);
		setTimeout(function(){toggleNotification(-1);},2500);
	}
}

var isFormOpen = false;

function toggleForm(){
	if(isFullContainerOpen == false && isOpenedProfile == false){
		//change margin
		var contentMargin = document.getElementsByClassName('container-main-frame');

		var x = document.getElementById('container-form-main');
		if(x.style.display == "none"){
			if(isOpenedNews)
				toggleNews();
			isFormOpen = true;
			x.style.display = "block";
			//scroll to top
			document.body.scrollTop = 0; //for safari
			document.documentElement.scrollTop = 0; //for the rest
		}else{
			isFormOpen = false;
			x.style.display = "none";
			contentMargin[0].style.marginTop = "5.5em";
		}
}
}

function cancelArticle(){
	toggleForm();
	getContainerTitle.value = "";
	getContainerContent.value = "";
}

var isFullContainerOpen = false;

var commentCount = 0;

//for loading comments
function loadComments(){
	commentCount+=2;
	var commentPostId = document.getElementById('container-full-comment-section').getElementsByTagName('span')[0].innerHTML;
	//commentCount+=2;
	$('#container-full-comment-section').load(
		"Includes/load-comments.php",
		{
			commentNewCount: commentCount,
			commentPostId: document.getElementById('container-full-comment-section').getElementsByTagName('span')[0].innerHTML
		}
	);
}

//for checking if the current user has already liked this post
function checkLikedCurrentUser(){
	//checking
	let x = document.getElementById('container-full-text-content');
	let postId = x.getElementsByTagName('p')[1].innerHTML;
	let userId = document.getElementsByName('_loggedUserId')[0].value
	$('[name=_checkCurrentUserLoggedOuter]').load(
		"Includes/checkLikeCurrentUser.php",
		{
			_postId: postId,
			_userId: userId
		}
	);
}

//for loading likes
function updateLikeCount(){
	let x = document.getElementById('container-full-text-content');
	let postId = x.getElementsByTagName('p')[1].innerHTML;

	$('[name=_likeCount]').load(
		"Includes/updateLikeCount.php",
		{
			_postId: postId
		}
	);
}

//for loading comment count
function updateCommentCount(){
	let x = document.getElementById('container-full-text-content');
	let postId = x.getElementsByTagName('p')[1].innerHTML;
	$('[name=_commentCount]').load(
		"Includes/updateCommentCount.php",
		{
			_postId: postId
		}
	);
}

//for loading shares
function updateShareCount(){
	let x = document.getElementById('container-full-text-content');
	let postId = x.getElementsByTagName('p')[1].innerHTML;

	$('[name=_shareCount]').load(
		"Includes/updateShareCount.php",
		{
			_postId: postId
		}
	);
}

//for showing success messages
var successMessage;
function showSuccessMessage(type){
	if(type=="like"){
		successMessage = document.getElementsByName('_newLikeSuccess')[0];
	}else if(type=="comment"){
		successMessage = document.getElementsByName('_newCommentSuccess')[0];
	}else if(type=="share"){
		successMessage = document.getElementsByName('_newShareSuccess')[0];
	}
	successMessage.style.display = "block";
	setTimeout(function(){$(successMessage).fadeOut(1000);},3000);
}

//for sending feedback
function sendFeedback(){
	let feedbackContent = document.getElementsByName('_newFeedbackContent')[0].value;

	function showSuccessMessageFeedback(){
		//show success message
		document.getElementsByName('_feedbackSuccess')[0].style.display = "block";
		setTimeout(function(){$('[name=_feedbackSuccess]').fadeOut(1000);},3000);
		//reset feedbackContent
		document.getElementsByName('_newFeedbackContent')[0].value = "";
	}
	if(feedbackContent){
		$.ajax({
			type: "POST",
			url: "Includes/sendFeedback.php",
			data: {
				_newFeedbackContent: feedbackContent
			},
			success:showSuccessMessageFeedback()
		});
	}else{
		document.getElementsByName('_feedbackError')[0].style.display = "block";
		setTimeout(function(){$('[name=_feedbackError]').fadeOut(1000);},3000);
	}
}

//for showing the help containers
var currentHelpScreen = 0;
function toggleHelpScreen(){
	switch (currentHelpScreen) {
		case 0:
			document.getElementById('container-help-1').style.display = "none";
			document.getElementById('container-help-2').style.display = "none";
			document.getElementById('container-help-3').style.display = "none";
			document.getElementById('container-help-4').style.display = "none";
			break;
		case 1:
			document.getElementById('container-help-1').style.display = "block";
			document.getElementById('container-help-2').style.display = "none";
			document.getElementById('container-help-3').style.display = "none";
			document.getElementById('container-help-4').style.display = "none";
			break;
		case 2:
			document.getElementById('container-help-1').style.display = "none";
			document.getElementById('container-help-2').style.display = "block";
			document.getElementById('container-help-3').style.display = "none";
			document.getElementById('container-help-4').style.display = "none";
			break;
		case 3:
			document.getElementById('container-help-1').style.display = "none";
			document.getElementById('container-help-2').style.display = "none";
			document.getElementById('container-help-3').style.display = "block";
			document.getElementById('container-help-4').style.display = "none";
			break;
		case 4:
			document.getElementById('container-help-1').style.display = "none";
			document.getElementById('container-help-2').style.display = "none";
			document.getElementById('container-help-3').style.display = "none";
			document.getElementById('container-help-4').style.display = "block";
			break;
		default:
			break;
	}
}

$(document).ready(function(){

	//for clicking of the help button
	$('#container-help-button').click(function(){
		toggleOverlay();
		currentHelpScreen = 1;
		toggleHelpScreen();
	});
	//for closing the help panels
	$('[name=help-button-close]').click(function(){
		document.getElementById("overlay").style.display = "none";
		isOpenedOverlay = false;
		currentHelpScreen = 0;
		toggleHelpScreen();
	});

	//for clicking next on help container
	$('[name=help-button-next]').click(function(){
		currentHelpScreen++;
		toggleHelpScreen();
	});
	//for clicking previous on help container
	$('[name=help-button-previous]').click(function(){
		currentHelpScreen--;
		toggleHelpScreen();
	});

	//for loading main page when user is not logged in
	let userId = document.getElementsByName('_loggedUserId')[0].value;

	if(document.getElementsByName('_loggedUserId')[0].value){
		//hide main page container
		$('#content').css("display", "grid");
		$('#container-main-page').css("display", "none");
		//removing the element--does it work????
		let element = document.getElementById('#container-main-page');
		if(element)
			element.parentNode.removeChild(element);
		//load posts
		$('#content').load(
			"Includes/loadPostsMainPage.php",
			{
				_userId: userId
			},function(){
				//for clicking on the overlay
				$('#overlay').click(function(){
					if(isOpenedProfile == true){
						toggleProfile();
					}else if(isFullContainerOpen == true){
						//here
						toggleFullContainer();
					}else if(isOpenedOtherProfile == true){
						if(loadedFromProfile == 1){
							toggleProfile();
						}else if(loadedFromProfile == 0){
							toggleOtherProfile();
						}
					}
				});
				//showing help button
				document.getElementById('container-help-button').style.display = "block";
			}
		);

	}else{
		//adding the element
		let newElement = document.createElement("DIV");
		newElement.setAttribute('id', 'container-main-page');
		//document.getElementById('#content')[0].appendChild(newElement);
		document.getElementsByTagName('body')[0].appendChild(newElement);

		//show main page container
		$('#container-main-page').load(
			"Includes/loadMainPage.php", function(){
				$('#content').css("display", "block");
				//loading live stats
				$('#main_page_c4').load(
					"Includes/loadLiveStats.php"
				);
				//hiding help button
				document.getElementById('container-help-button').style.display = "none";
			}
		);

	}
	//for loading stats every 5 seconds
	setInterval(function(){
		$('#main_page_c4').load(
			"Includes/loadLiveStats.php"
		); // this will run after every 5 seconds
	}, 5000);

	//for loading comments
	//is this working?
	$('#show-more-comments').click(function(){
		var commentPostId = document.getElementById('container-full-comment-section').getElementsByTagName('span')[0].innerHTML;
		commentCount+=2;
		$('#container-full-comment-section').load(
			"Includes/load-comments.php",
			{
				commentNewCount: commentCount,
				commentPostId: commentPostId
			}
		);
		//loadComments();
	});




	//resize it even before resizing manually
	if($(window).width() < 810){
		$('#content').css("grid-template-columns", "repeat(1, 1fr)");
	}else if($(window).width() < 1220){
		$('#content').css("grid-template-columns", "repeat(2, 1fr)");
	}else if($(window).width() < 1630){
		$('#content').css("grid-template-columns", "repeat(3, 1fr)");
	}else if($(window).width() < 2040){
		$('#content').css("grid-template-columns", "repeat(4, 1fr)");
	}else{
		$('#content').css("grid-template-columns", "repeat(5, 1fr)");
	}
	changeGridColumns();
	changeGridColumns("otherProfile")

	//for mobile compatibility
	$(window).resize(function(){
			if($(window).width() < 810){
				$('#content').css("grid-template-columns", "repeat(1, 1fr)");
			}else if($(window).width() < 1220){
				$('#content').css("grid-template-columns", "repeat(2, 1fr)");
			}else if($(window).width() < 1630){
				$('#content').css("grid-template-columns", "repeat(3, 1fr)");
			}else if($(window).width() < 2040){
				$('#content').css("grid-template-columns", "repeat(4, 1fr)");
			}else{
				$('#content').css("grid-template-columns", "repeat(5, 1fr)");
			}
			changeGridColumns();
			changeGridColumns("otherProfile")
	});

	//for toggling profile
	$('[name=_toggleProfile]').click(toggleProfile);

	//for toggling news
	$('[name=_toggleNews]').click(toggleNews);

	//for loading fullcontainer script
	let postId = 1;
	$('#container-full-frame').load(
		"Includes/loadContainerFullFrame.php",
		{
			_userId: document.getElementsByName('_loggedUserId')[0].value,
			_postId: postId
		},function(){
			//adding a comment panel
			$('[name=container-full-bar-content-comment]').click(toggleAddComment);
			$('[name=container-full-bar-content-share]').click(toggleAddShare);

			//for posting comments
			$('[name=post-comment]').click(function(e){
				e.preventDefault();
				let x = document.getElementsByName('_newCommentContent')[0].value;
				if(x){
					var commentPostId = document.getElementById('container-full-text-content').getElementsByTagName('p')[1].innerHTML;
					var commentUserId = document.getElementsByName('_loggedUserId')[0].value;
					var commentContent = x;
					var commentParent = document.getElementById('container-full-text-content').getElementsByTagName('p')[1].innerHTML;

					let url = "Includes/comment.php";

					var concatenatedData = 'pId='+commentPostId+'&pUid='+commentUserId+'&pCnt='+commentContent+'&pPrn='+commentParent;
					console.log(concatenatedData);
					$.ajax({
						type: "POST",
						url: url,
						data: {
							_commentPostId: commentPostId,
							_commentUserId: commentUserId,
							_commentContent: commentContent,
							_commentParent: commentParent
						},
						success: function(){
							resetComment();
							//loading comments
							commentCount = 1000;
							loadComments();
							//updating comment count
							updateCommentCount();
							//showing success message
							showSuccessMessage("comment");
						}
					});

				}else{
					//showing error message
					document.getElementsByName('_newCommentError')[0].style.display = "block";
				}
			});

			//for liking posts
			$('[name=container-full-bar-content-like]').click(function(){
				let x = document.getElementById('container-full-text-content');
				let postId = x.getElementsByTagName('p')[1].innerHTML;
				let userId = document.getElementsByName('_loggedUserId')[0].value;
				let url = "Includes/like.php";
				$.ajax({
					type: "POST",
					url: url,
					data: {
						_postId: postId,
						_userId: userId
					},
					success: function(){
						//updating like count
						updateLikeCount();
						//changing like text
						checkLikedCurrentUser();
						//modifying stuff
						//!failure at turning the text in italics when current post is "Liked"
						let local_text = document.getElementsByName('_checkCurrentUserLogged')[0].innerHTML;
						if(local_text == "Like"){
							//document.getElementsByName('_checkCurrentUserLoggedOuter')[0].getElementsByTagName('h4')[0].style.fontStyle = "italic";
							document.getElementsByName('_newLikeSuccess')[0].innerHTML = "Post liked succesfully.";
						}else if(local_text == "Liked"){
							//document.getElementsByName('_checkCurrentUserLoggedOuter')[0].getElementsByTagName('h4')[0].style.fontStyle = "normal";
							document.getElementsByName('_newLikeSuccess')[0].innerHTML = "You no longer like this post.";
						}
						//showing success message
						showSuccessMessage("like");
					}
				});
			});

			//for sharing posts
			$('[name=post-share]').click(function(e){
				e.preventDefault();
				let x = document.getElementById('container-full-text-content');
				let postId = x.getElementsByTagName('p')[1].innerHTML;
				let userId = document.getElementsByName('_loggedUserId')[0].value;
				let shareContent = document.getElementsByName('_newShareContent')[0].value;
				let url = "Includes/share.php";
				if(shareContent == "")
					shareCount = "empty";
				console.log(postId);
				$.ajax({
					type: "POST",
					url: url,
					data: {
						_postId: postId,
						_userId: userId,
						_shareContent: shareContent
					},
					success: function(){
						//reset share
						resetShare();
						//update share count
						updateShareCount();
						//showing success message
						showSuccessMessage("share");
					}
				});
			});

			//for toggling likedList
			$('._likedList').hover(function(e){
				document.getElementById('container-liked-list').style.display = "block";
				$('._likedList').mousemove(function(e){
					//loading data
					let x = document.getElementById('container-full-text-content');
					let postId = x.getElementsByTagName('p')[1].innerHTML;
					$('#container-liked-list').load("Includes/loadLikedList.php",{
						_postId: postId
					});
					//calling function to show the container on mouse position
					hoverDiv(e);
				});
			});

			$('._likedList').mouseleave(function(e){
				document.getElementById('container-liked-list').style.display = "none";
			});
		}
	);


	//loading news unread counter
	$('[name=_newNewsCounter]').load(
		"Includes/loadNewsUnreadCounter.php",
		{
			_loggedUserId: document.getElementsByName('_loggedUserId')[0].value
		}, function(){
			if(document.getElementsByName('_newNewsCounter')[0].innerHTML == "<span>0</span>"){
				document.getElementsByName('_newNewsCounter')[0].style.display = "none";
			}else{
				document.getElementsByName('_newNewsCounter')[0].style.display = "block";
			}
		}
	);


});//DOCUMENT LOAD ENDING

//for changing grid number of columns !!FOR PROFILE PAGES
function changeGridColumns(type){
	if(type == "otherProfile"){
		if(isOpenedOtherProfile == false){
			if($(window).width() < 1100){
				$('#container-profile-other-inside-frame').css("grid-template-columns", "repeat(1, 1fr)");
			}else{
				$('#container-profile-other-inside-frame').css("grid-template-columns", "repeat(2, 1fr)");
			}
		}else if(isOpenedOtherProfile == true){
			if($(window).width() < 1100){
				$('#container-profile-other-inside-frame').css("grid-template-columns", "repeat(1, 1fr)");
			}else if($(window).width() < 1450){
				$('#container-profile-other-inside-frame').css("grid-template-columns", "repeat(2, 1fr)");
			}else{
				$('#container-profile-other-inside-frame').css("grid-template-columns", "repeat(3, 1fr)");
			}
		}
	}else{//regular profile
		if(isFriendsProfilePageOpen == false){
			if($(window).width() < 1100){
				$('#container-profile-inside-frame').css("grid-template-columns", "repeat(1, 1fr)");
			}else{
				$('#container-profile-inside-frame').css("grid-template-columns", "repeat(2, 1fr)");
			}
		}else if(isFriendsProfilePageOpen == true){
			if($(window).width() < 710){
				$('#container-profile-inside-frame').css("grid-template-columns", "repeat(1, 1fr)");
			}else if($(window).width() < 1050){
				$('#container-profile-inside-frame').css("grid-template-columns", "repeat(2, 1fr)");
			}else if($(window).width() < 1450){
				$('#container-profile-inside-frame').css("grid-template-columns", "repeat(3, 1fr)");
			}else{
				$('#container-profile-inside-frame').css("grid-template-columns", "repeat(4, 1fr)");
			}
		}
	}

}

//-read a bit higher-
function hoverDiv(e){
	var left  = e.clientX  + "px";
	var top  = e.clientY  + "px";

	var div = document.getElementById('container-liked-list');

	div.style.left = left;
	div.style.top = top;
	$('#container-liked-list').css('left',left);
	$('#container-liked-list').css('top',top);
	$('#container-liked-list').css('position','fixed');

	//$('#container-liked-list').toggle();
}

//for hiding the profile when opening a post from the profile menu
function hideProfile(){
	document.getElementById('container-profile-frame').style.display = "none";
}

function showProfile(){
	document.getElementById('container-profile-frame').style.display = "block";
}

function hideOtherProfile(){
	document.getElementById('container-profile-other-frame').style.display = "none";
}

function showOtherProfile(){
	document.getElementById('container-profile-other-frame').style.display = "block";
}

function toggleFullContainer(contId){
	if(isFullContainerOpen == true){
		//for opened profile
		if(isOpenedProfile == true){
			showProfile();
		}else if(isOpenedOtherProfile == true){
			loadedFromOtherProfile = 0;
			showOtherProfile();
		}
		let fullContainer = document.getElementById('container-full-frame');
		fullContainer.style.display = "none";
		//changeBodyOpacity(false);
		isFullContainerOpen = false;

		if(isOpenedProfile == true || isOpenedOtherProfile == true){
			isOpenedOverlay = false;
			toggleOverlay('fullContainer');
		}else
			toggleOverlay('profileContainer');
		//close the add comment section
		if(isOpenedAddComment == true)
			toggleAddComment();
		if(isOpenedAddShare == true)
			toggleAddShare();
	}else{
		//for opened profile
		if(isOpenedProfile == true){
			//select it from somewhere elese
			hideProfile();
		}else if(isOpenedOtherProfile == true){
			//do it naturally
			loadedFromOtherProfile = 1;
			hideOtherProfile();
		}
		if(isOpenedNews){
			toggleNews();
		}
		//limiting adding-comment number of characters
		document.getElementsByName('_newCommentContent')[0].maxLength = "300";
		//selecting data from the chosen article/post
		let selectedPostFrame = document.getElementsByName(contId)[0];

		let y = selectedPostFrame.getElementsByClassName('container-header-content')[0];
		var postTitle = y.getElementsByTagName('h2')[0].innerHTML;
		var postAuthor = y.getElementsByTagName('h3')[0].getElementsByTagName('span')[0].innerHTML;
		var postDate = y.getElementsByTagName('h3')[0].getElementsByTagName('span')[1].innerHTML;
		var postImage = y.getElementsByTagName('h3')[0].getElementsByTagName('span')[2].innerHTML;

		y = selectedPostFrame.getElementsByClassName('container-text-content')[0];
		var postContent = y.getElementsByTagName('p')[1].innerHTML; //full text
		var postId = y.getElementsByTagName('p')[2].innerHTML;

		//loading patch
		$('#container-full-header-content').load(
			"Includes/fullContainerPatch.php",
			{
				_postId: postId
			}, function(){
				//adding the selected data to the full container
				let x = document.getElementById('container-full-header-content');
				x.getElementsByTagName('h1')[0].innerHTML = postTitle;
				x.getElementsByTagName('img')[0].src = "Pictures/"+postImage;
				x.getElementsByTagName('h3')[1].innerHTML = postAuthor;
				x.getElementsByTagName('h4')[0].innerHTML = "Published on " + postDate;
			}
		);

		x = document.getElementById('container-full-text-content');
		x.getElementsByTagName('p')[0].innerHTML = postContent;
		x.getElementsByTagName('p')[1].innerHTML = postId;
		document.getElementById('container-full-comment-section').getElementsByTagName('span')[0].innerHTML = postId;

		//showing it
		let fullContainer = document.getElementById('container-full-frame');
		fullContainer.style.display = "block";
		//changeBodyOpacity(true);
		isFullContainerOpen = true;
		if(isOpenedProfile == true || isOpenedOtherProfile == true){
			isOpenedOverlay = false;
		}
		toggleOverlay('fullContainer');
		//loading Comments
		commentCount=0;
		loadComments();

		//load likes and shares count
		updateLikeCount();
		updateCommentCount();
		updateShareCount();

		//check if comment has been liked by current user
		checkLikedCurrentUser();

		//deleting success messages
		document.getElementsByName('_newLikeSuccess')[0].style.display = "none";
		document.getElementsByName('_newCommentSuccess')[0].style.display = "none";
		document.getElementsByName('_newShareSuccess')[0].style.display = "none";

		//location the full container at the top of the screen
		let topOffset = 85;
		fullContainer.style.top = $(window).scrollTop()+topOffset;

		//scrolling to top
		//document.body.scrollTop = 0; // For Safari
  	//document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}
}

var openedLoginContainer = false;
var openedSignupContainer = false;

function toggleLoginContainer(){
	if(isFullContainerOpen == false && isOpenedProfile == false){
		let fullLoginContainer = document.getElementById('container-login-frame');
		if(openedLoginContainer == true){
			fullLoginContainer.style.display = "none";
			openedLoginContainer = false;
		}else{
			if(openedSignupContainer == true)
				toggleSignupContainer();
			fullLoginContainer.style.display = "block";
			openedLoginContainer = true;
		}
	}
}

function toggleSignupContainer(){
	if(isFullContainerOpen == false && isOpenedProfile == false){
		let fullSignupContainer = document.getElementById('container-signup-frame');
		if(openedSignupContainer == true){
			fullSignupContainer.style.display = "none";
			openedSignupContainer = false;
		}else{
			if(openedLoginContainer == true)
				toggleLoginContainer();
			fullSignupContainer.style.display = "block";
			openedSignupContainer = true;
		}
	}
}

function loginFunction(){
	let emailContainer = document.getElementsByName('_loginEmail')[0];
	emailContainer.style.backgroundColor = "#f8f8f8";
	let passContainer	= document.getElementsByName('_loginPass')[0];
	passContainer.style.backgroundColor = "#f8f8f8";
	var proceed = true;
	if(emailContainer.value == ""){
		proceed = false;
		emailContainer.style.backgroundColor = "salmon";
	}
	if(passContainer.value == ""){
		proceed = false;
		passContainer.style.backgroundColor = "salmon";
	}
	if(proceed == true){
		//add here log in code
		toggleNotification(4);
		setTimeout(function(){toggleNotification(-1);},2500);
		//change topBannerRight
		changeTopBannerRight(true);
	}else{
		toggleNotification(2);
		setTimeout(function(){toggleNotification(-1);},2500);
	}
}

function logoutFunction(){
	changeTopBannerRight(false);
	toggleNotification(6);
	setTimeout(function(){toggleNotification(-1);},2500);
}

function registerFunction(){
	let emailContainer = document.getElementsByName('signupEmail')[0];
	emailContainer.style.backgroundColor = "#f8f8f8";
	let fnameContainer = document.getElementsByName('signupFName')[0];
	fnameContainer.style.backgroundColor = "#f8f8f8";
	let lnameContainer = document.getElementsByName('signupLName')[0];
	lnameContainer.style.backgroundColor = "#f8f8f8";
	let passContainer = document.getElementsByName('signupPass')[0];
	passContainer.style.backgroundColor = "#f8f8f8";
	let repassContainer = document.getElementsByName('signupRePass')[0];
	repassContainer.style.backgroundColor = "#f8f8f8";
	var proceed = true;
	if(emailContainer.value == ""){
		proceed = false;
		emailContainer.style.backgroundColor = "salmon";
	}
	if(fnameContainer.value == ""){
		proceed = false;
		fnameContainer.style.backgroundColor = "salmon";
	}
	if(lnameContainer.value == ""){
		proceed = false;
		lnameContainer.style.backgroundColor = "salmon";
	}
	if(passContainer.value == ""){
		proceed = false;
		passContainer.style.backgroundColor = "salmon";
	}
	if(repassContainer.value == ""){
		proceed = false;
		repassContainer.style.backgroundColor = "salmon";
	}
	let passwordsSame = true;
	if(proceed == true){
		if(passContainer.value != repassContainer.value){
			proceed = false;
			passwordsSame = false;
			passContainer.style.backgroundColor = "salmon";
			repassContainer.style.backgroundColor = "salmon";
		}
	}
	if(passwordsSame == false){
		toggleNotification(3);
		setTimeout(function(){toggleNotification(-1);},2500);
	}else if(proceed == false){
		toggleNotification(2);
		setTimeout(function(){toggleNotification(-1);},2500);
	}else{
		emailContainer.value = "";
		fnameContainer.value = "";
		lnameContainer.value = "";
		passContainer.value = "";
		repassContainer.value = "";
		toggleSignupContainer();
		toggleNotification(5);
		setTimeout(function(){toggleNotification(-1);},2500);
	}
}

function changeTopBannerRight(isLoggedIn){
	if(isLoggedIn == true){
		let x = document.getElementsByClassName('topBanner-right')[0];
		x.getElementsByTagName('h1')[0].innerHTML = "Profile";
		x.getElementsByTagName('h1')[1].innerHTML = "Log out";
		toggleLoginContainer();
		x.getElementsByTagName('h1')[0].setAttribute( "onClick", "toggleProfile()");
		x.getElementsByTagName('h1')[1].setAttribute( "onClick", "logoutFunction()");
	}else{
		let x = document.getElementsByClassName('topBanner-right')[0];
		x.getElementsByTagName('h1')[0].innerHTML = "Log in";
		x.getElementsByTagName('h1')[1].innerHTML = "Sign up";
		x.getElementsByTagName('h1')[0].setAttribute( "onClick", "toggleLoginContainer()");
		x.getElementsByTagName('h1')[1].setAttribute( "onClick", "toggleSignupContainer()");
	}
}

var isOpenedProfile = false;

function toggleProfile(){
	//for hiding success message for adding friends
	document.getElementsByName('container-profile-other-success-message')[0].style.display = "none";
	let profileContainer = document.getElementById('container-profile-frame');
	if(isFullContainerOpen == false){
		if(isOpenedProfile == false){
			//for updating data
			loadProfileOptionsHeaderData();
			if(isFormOpen == true)
				toggleForm();
			if(isOpenedOtherProfile == true)
				toggleOtherProfile();
			if(loadedFromProfile == 1){
				//hiding back button
				document.getElementsByName('_goBackToProfile')[0].style.display = "none";
				loadedFromProfile = 0;
			}


			if(isOpenedNews)
				toggleNews();
			isOpenedProfile = true;
			profileContainer.style.display = "block";
			//changeBodyOpacity(true);
			toggleOverlay('profileContainer');
			//select "Posts" options in the menu
			document.getElementsByName('_profileMenuButton1')[0].style.backgroundColor = "#b3382c";
			//change layout of posts/shares etc
			if($(window).width() < 1100){
		    $('#container-profile-inside-frame').css("grid-template-columns", "repeat(1, 1fr)");
		  }else{
		    $('#container-profile-inside-frame').css("grid-template-columns", "repeat(2, 1fr)");
		  }
			//loading initial posts
			let userId = document.getElementsByName('_loggedUserId')[0].value;
			isLoadingProfilePages = true;
		  $('#container-profile-inside-frame').load(
		    "Includes/loadPostsProfile.php",
		    {
		      _userId: userId
		    },function(){//success function
					isLoadingProfilePages = false;
				}
		  );
		}else{

			isFriendsProfilePageOpen = false;
			isOpenedProfile = false;
			profileContainer.style.display = "none";
			//changeBodyOpacity(false);
			toggleOverlay('profileContainer');
			if(isOpenedOptionsDropdown)
				toggleOptionButton();
			changeSelectedButton(0);

		}
	}else{
		//opening from fullcontainer
		toggleFullContainer();
		loadProfileOptionsHeaderData();
		isOpenedProfile = true;
		profileContainer.style.display = "block";
		toggleOverlay('profileContainer');
		let userId = document.getElementsByName('_loggedUserId')[0].value;
		isLoadingProfilePages = true;
		$('#container-profile-inside-frame').load(
			"Includes/loadPostsProfile.php",
			{
				_userId: userId
			},function(){//success function
				isLoadingProfilePages = false;
			}
		);
	}
}

var isOpenedNews = false;

function toggleNews(){
	if(isOpenedNews == false){
		let userId = document.getElementsByName('_loggedUserId')[0].value;
		//for loading news notifications
		$('#container-news-inside-frame').load(
			"Includes/loadNewsNotifications.php",
			{
				_userId: userId
			}, function(){
				//add clicking event for see more button
				$('[name=_openNotificationPageButton]').click(function(){
					togglePageNotifications();
				});
			}
		);
		//open it
		isOpenedNews = true;
		document.getElementById('container-news-frame').style.display = "block";

	}else{
		//close it
		isOpenedNews = false;
		document.getElementById('container-news-frame').style.display = "none";
	}
}

function changeBodyOpacity(makeOp){
	//let x = document.getElementById('overlay-opacity');
	if(makeOp == true){
		let bodyOpacity = document.querySelectorAll("body > div:not(container-profile-frame)")[0];
		bodyOpacity.style.opacity = "0.4";
		if(isOpenedProfile == true){
			//bodyOpacity = document.querySelectorAll(".container-main-frame")[0];
			//bodyOpacity.style.opacity = "0.4";
		}
		//x.style.display = "block";
	}else{
		let bodyOpacity = document.querySelectorAll("body > div:not(container-profile-frame)")[0];
		bodyOpacity.style.opacity = "1";
		if(isOpenedProfile == false){
			//bodyOpacity = document.querySelectorAll("#content:not(container-full-frame)")[0];
			//bodyOpacity.style.opacity = "1";
		}
		//x.style.display = "none";
	}
}

var isOpenedOverlay = false;

function toggleOverlay(type){
	if(isOpenedOverlay == false){
		//alert('opening');
		document.getElementById("overlay").style.display = "block";
		isOpenedOverlay = true;
		//changing z-index
		if(type == 'fullContainer')
			document.getElementById("container-full-frame").style.zIndex = "5";
		else if(type == 'profileContainer')
			document.getElementById("container-profile-frame").style.zIndex = "5";
		else if(type = 'otherProfileContainer')
			document.getElementById('container-profile-other-frame').style.zIndex = "5";
	}else if(isOpenedOverlay == true){
		//alert('closing');
		document.getElementById("overlay").style.display = "none";
		isOpenedOverlay = false;
		//changing z-index
		if(type == 'fullContainer'){
			document.getElementById("container-full-frame").style.zIndex = "3";
		}else if(type == 'profileContainer'){
			document.getElementById("container-profile-frame").style.zIndex = "3";
		}else if(type = 'otherProfileContainer'){
			document.getElementById('container-profile-other-frame').style.zIndex = "3";
		}
	}

}

var isOpenedAddComment = false;

function toggleAddComment(){
	if(isOpenedAddComment == false){
		if(isOpenedAddShare == true)
			toggleAddShare();
		document.getElementById('container-add-comment').style.display = "block";
		isOpenedAddComment = true;
		//hiding success messages
		document.getElementsByName('_newLikeSuccess')[0].style.display = "none";
		document.getElementsByName('_newCommentSuccess')[0].style.display = "none";
		document.getElementsByName('_newShareSuccess')[0].style.display = "none";
	}else{
		document.getElementById('container-add-comment').style.display = "none";
		isOpenedAddComment = false;
	}
}

var isOpenedAddShare = false;

function toggleAddShare(){
	if(isOpenedAddShare == false){
		if(isOpenedAddComment == true)
			toggleAddComment();
		document.getElementById('container-add-share').style.display = "block";
		isOpenedAddShare = true;
		//hiding success messages
		document.getElementsByName('_newLikeSuccess')[0].style.display = "none";
		document.getElementsByName('_newCommentSuccess')[0].style.display = "none";
		document.getElementsByName('_newShareSuccess')[0].style.display = "none";
	}else{
		document.getElementById('container-add-share').style.display = "none";
		isOpenedAddShare = false;
	}
}

function resetComment(){
	document.getElementById('container-add-comment').getElementsByTagName('textarea')[0].value = "";
	toggleAddComment();
}

function resetShare(){
	document.getElementById('container-add-share').getElementsByTagName('textarea')[0].value = "";
	toggleAddShare();
}

function acceptFriendRequest(idReq){
	$.ajax({
		type: "POST",
		url: "Includes/acceptFrequestFromNews.php",
		data: {
			_idReq: idReq
		},
		success: function (){
			let userId = document.getElementsByName('_loggedUserId')[0].value;
			//for loading news notifications
			$('#container-news-inside-frame').load(
				"Includes/loadNewsNotifications.php",
				{
					_userId: userId
				}, function(){
					//success
					//loading news unread counter
					$('[name=_newNewsCounter]').load(
						"Includes/loadNewsUnreadCounter.php",
						{
							_loggedUserId: document.getElementsByName('_loggedUserId')[0].value
						}, function(){
							if(document.getElementsByName('_newNewsCounter')[0].innerHTML == "<span>0</span>"){
								document.getElementsByName('_newNewsCounter')[0].style.display = "none";
							}else{
								document.getElementsByName('_newNewsCounter')[0].style.display = "block";
							}
						}
					);
				}
			);
		}
	});
}

function rejectFriendRequest(idReq){
	$.ajax({
		type: "POST",
		url: "Includes/deleteFriendRequestFromNews.php",
		data: {
			_idReq: idReq
		},
		success: function (){
			let userId = document.getElementsByName('_loggedUserId')[0].value;
			//for loading news notifications
			$('#container-news-inside-frame').load(
				"Includes/loadNewsNotifications.php",
				{
					_userId: userId
				}
			);
			//loading news unread counter
			$('[name=_newNewsCounter]').load(
				"Includes/loadNewsUnreadCounter.php",
				{
					_loggedUserId: document.getElementsByName('_loggedUserId')[0].value
				}, function(){
					if(document.getElementsByName('_newNewsCounter')[0].innerHTML == "<span>0</span>"){
						document.getElementsByName('_newNewsCounter')[0].style.display = "none";
					}else{
						document.getElementsByName('_newNewsCounter')[0].style.display = "block";
					}
				}
			);
		}
	});
}

function clickNewsNotification(containerId){
	toggleOtherProfile(document.getElementsByName('_newsNotificationClickable')[containerId*3+2].innerHTML,"_local");
}

function togglePageNotifications(){
	//still to implement
	//make another Script
	//OR
	//insert a container into which you'll load the data
	/*
	let userId = document.getElementsByName('_loggedUserId')[0].value;
	$('#content').load(
		"Includes/loadNewsNotifications.php",
		{
			_userId: userId
		}, function(){
			alert('loaded with success!');
		}
	);
	*/
}
