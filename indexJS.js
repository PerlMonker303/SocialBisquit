var basicContainer=0;
var nextNumber = 3;

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
	$("[name='profile-option-button']").click(toggleProfileOptionsList);
	//click events for options
	$("[name='_optionList1']").click(selectSettingsMenu);
	$("[name='_optionList2']").click(function(){
		$("[name='_logoutButton']").trigger('click');
	});
}

var isProfileOptionsList = false;

function toggleProfileOptionsList(){
	if(isProfileOptionsList == true){
		isProfileOptionsList = false;

		document.getElementById('container-profile-triangle').style.display = "none";
		document.getElementById('container-profile-options-list').style.display = "none";
	}else{
		isProfileOptionsList = true;

		document.getElementById('container-profile-triangle').style.display = "block";
		document.getElementById('container-profile-options-list').style.display = "block";
	}
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
	if(isFullContainerOpen == false && isOpenedProfile == false && isOpenedOtherProfile == false){
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
        //window.history.pushState({}, "Hide", "http://localhost/socialCrushrApp/index.php");
				window.history.pushState({}, "Hide", "https://anti-social-crushr.herokuapp.com/index.php");
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
			if(contentMargin[0])
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
		}, function(){
			//success

		}
	);
}

//for checking if the current user has already liked this post
function checkLikedCurrentUser(){
	//checking
	let x = document.getElementById('container-full-text-content');
	let postId = x.getElementsByTagName('p')[1].innerHTML;
	let userId = document.getElementsByName('_loggedUserId')[0].value;
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
	}else if(type == "likePicture"){
		successMessage = document.getElementsByName('_newLikeSuccessPicture')[0];
		if(successMessage.innerHTML == "Picture liked succesfully."){
			successMessage.innerHTML = "You no longer like this post.";
		}else{
			successMessage.innerHTML = "Picture liked succesfully.";
		}
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
			document.getElementById('container-help-5').style.display = "none";
			break;
		case 1:
			document.getElementById('container-help-1').style.display = "block";
			document.getElementById('container-help-2').style.display = "none";
			document.getElementById('container-help-3').style.display = "none";
			document.getElementById('container-help-4').style.display = "none";
			document.getElementById('container-help-5').style.display = "none";
			break;
		case 2:
			document.getElementById('container-help-1').style.display = "none";
			document.getElementById('container-help-2').style.display = "block";
			document.getElementById('container-help-3').style.display = "none";
			document.getElementById('container-help-4').style.display = "none";
			document.getElementById('container-help-5').style.display = "none";
			break;
		case 3:
			document.getElementById('container-help-1').style.display = "none";
			document.getElementById('container-help-2').style.display = "none";
			document.getElementById('container-help-3').style.display = "block";
			document.getElementById('container-help-4').style.display = "none";
			document.getElementById('container-help-5').style.display = "none";
			break;
		case 4:
			document.getElementById('container-help-1').style.display = "none";
			document.getElementById('container-help-2').style.display = "none";
			document.getElementById('container-help-3').style.display = "none";
			document.getElementById('container-help-4').style.display = "block";
			document.getElementById('container-help-5').style.display = "none";
			break;
		case 5:
		document.getElementById('container-help-1').style.display = "none";
		document.getElementById('container-help-2').style.display = "none";
		document.getElementById('container-help-3').style.display = "none";
		document.getElementById('container-help-4').style.display = "none";
		document.getElementById('container-help-5').style.display = "block";
			break;
		default:
			break;
	}
}

var forgotPasswordStep = 0;
var forgotEmail = "";
var forgotPassword = "";
var forgotPasswordCheck = "";

function forgotPasswordFunction(step){

	//check if input field is empty
	let inputField = document.getElementById('container-forgotPassword-frame').getElementsByTagName('input')[0];
	if(inputField.value){
		//0-closed
		//1-getting the email adress
		//2-answering secret question
		//3-selecting new password
		//4-confirm new password

		switch(step){
			case 0:
				alert('You\'re in the wrong place :)');
				break;
			case 1:
				$('#container-forgotPassword-frame').load(
					'Includes/forgotPasswordPhase1.php',
					{
						_input: inputField.value
					},function(){
						forgotEmail = inputField.value;
						inputField = document.getElementById('container-forgotPassword-frame').getElementsByTagName('input')[0];
						if(inputField.value == 'User doesn\'t exist'){
							let successMessage = document.getElementById('_successMessageForgotPassword');
							successMessage.innerHTML = inputField.value;
							successMessage.style.display = "block";
							inputField.style.backgroundColor = "#FFA07A";
							inputField.value = "";
							setTimeout(function(){$(successMessage).fadeOut(1000, function(){
								inputField.style.backgroundColor = "#f8f8f8";
							});},2000);
						}else if(inputField.value == 'This user has yet to set their secret question'){
							let successMessage = document.getElementById('_successMessageForgotPassword');
							successMessage.innerHTML = inputField.value;
							successMessage.style.display = "block";
							inputField.style.backgroundColor = "#FFA07A";
							inputField.value = "";
							setTimeout(function(){$(successMessage).fadeOut(1000, function(){
								inputField.style.backgroundColor = "#f8f8f8";
							});},2000);
						}
					}
				);
				break;
			case 2:
				inputField = document.getElementById('container-forgotPassword-frame').getElementsByTagName('input')[0];
				$('#container-forgotPassword-frame').load(
					'Includes/forgotPasswordPhase2.php',
					{
						_input: inputField.value,
						_email: forgotEmail
					}, function(){
						inputField = document.getElementById('container-forgotPassword-frame').getElementsByTagName('input')[0];
						if(inputField.value == 'Wrong answer'){
							forgotPasswordStep = 1;
							let successMessage = document.getElementById('_successMessageForgotPassword');
							successMessage.innerHTML = inputField.value;
							successMessage.style.display = "block";
							inputField.style.backgroundColor = "#FFA07A";
							inputField.value = "";
							setTimeout(function(){$(successMessage).fadeOut(1000, function(){
								inputField.style.backgroundColor = "#f8f8f8";
							});},2000);
						}
					}
				);
				break;
			case 3:
				inputField = document.getElementById('container-forgotPassword-frame').getElementsByTagName('input')[0];
				forgotPassword = inputField.value;
				$('#container-forgotPassword-frame').load(
					'Includes/forgotPasswordPhase3.php',
					function(){
						//nothing really
					}
				);

				break;
			case 4:
				inputField = document.getElementById('container-forgotPassword-frame').getElementsByTagName('input')[0];
				forgotPasswordCheck = inputField.value;
				$('#container-forgotPassword-frame').load(
					'Includes/forgotPasswordPhase4.php',
					{
						_input: inputField.value,
						_email: forgotEmail,
						_password: forgotPassword,
						_passwordCheck: forgotPasswordCheck
					},
					function(){
						inputField = document.getElementById('container-forgotPassword-frame').getElementsByTagName('input')[0];
						if(inputField){
							if(inputField.value == 'Passwords do not match'){
								forgotPasswordStep = 1;
								let successMessage = document.getElementById('_successMessageForgotPassword');
								successMessage.innerHTML = inputField.value;
								successMessage.style.display = "block";
								inputField.style.backgroundColor = "#FFA07A";
								inputField.value = "";
								setTimeout(function(){$(successMessage).fadeOut(1000, function(){
									inputField.style.backgroundColor = "#f8f8f8";
								});},2000);
							}
						}else{
							//hide container
							let successMessage = document.getElementById('container-forgotPassword-frame');
							setTimeout(function(){$(successMessage).fadeOut(1000);},4500);
						}

					}
				);
				break;
			default:
			 	break;
		}
	}else{
		//prompt message
		let successMessage = document.getElementById('_successMessageForgotPassword');
		successMessage.style.display = "block";
		inputField.style.backgroundColor = "#FFA07A";
		setTimeout(function(){$(successMessage).fadeOut(1000, function(){
			inputField.style.backgroundColor = "#f8f8f8";
		});},2000);
	}
}

var isLoadingLikedList = false;

$(document).ready(function(){

	//hide forgot password panel
	document.getElementById('container-forgotPassword-frame').style.display = "none";

	//event for _forgotPasswordButton
	$('[name=_forgotPasswordButton]').click(function(){
		//toggle forgotPasswordContainer
		if(forgotPasswordStep == 0 || forgotPasswordStep == 1){
			document.getElementById('container-forgotPassword-frame').style.display = "block";
		}
	});


	//for clicking of the help button
	$('#container-help-button').click(function(){
		if(isFormOpen)
			toggleForm();
		if(isOpenedNews)
			toggleNews();
		toggleOverlay();
		currentHelpScreen = 1;
		toggleHelpScreen();
		//scroll to top
		document.body.scrollTop = 0; //for safari
		document.documentElement.scrollTop = 0; //for the rest
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
				isOpenedNotificationsPage = false;
				//for clicking on the overlay
				$('#overlay').click(function(){
					if(isOpenedProfile == true){
						if(isOpenedPictureContainer){
							togglePictureContainer();
						}else{
							toggleProfile();
						}
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
				//updating last accessed
				$.ajax({
					type: "POST",
					url: "Includes/updateLastAccessed.php",
					data: {
						_userId: userId
					}
				});
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
				$('#content').css("grid-template-columns", "");
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
							//delete notifications in excess
							deleteNotificationExcess(document.getElementsByName('_authorOfPost')[0].innerHTML);
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
						//update notification unread
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
						//delete notifications in excess
						deleteNotificationExcess(document.getElementsByName('_authorOfPost')[0].innerHTML);
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
						//delete notifications in excess
						deleteNotificationExcess(document.getElementsByName('_authorOfPost')[0].innerHTML);
					}
				});
			});

			//for toggling likedList
			$('._likedList').hover(function(e){
				document.getElementById('container-liked-list').style.display = "block";
				$('._likedList').mousemove(function(e){
					if(isLoadingLikedList == false){
						isLoadingLikedList = true;

						//loading data
						let x = document.getElementById('container-full-text-content');
						let postId = x.getElementsByTagName('p')[1].innerHTML;
						$('#container-liked-list').load("Includes/loadLikedList.php",{
							_postId: postId
						});
						//calling function to show the container on mouse position
						hoverDiv(e);
					}

				});
			});

			$('._likedList').mouseleave(function(e){
				isLoadingLikedList = false;
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
			}else if($(window).width() < 1450){
				$('#container-profile-other-inside-frame').css("grid-template-columns", "repeat(2, 1fr)");
			}else{
				$('#container-profile-other-inside-frame').css("grid-template-columns", "repeat(3, 1fr)");
			}
		}else if(isOpenedOtherProfile == true){
			if($(window).width() < 1100){
				$('#container-profile-other-inside-frame').css("grid-template-columns", "repeat(1, 1fr)");
			}else if($(window).width() < 1625){
				$('#container-profile-other-inside-frame').css("grid-template-columns", "repeat(2, 1fr)");
			}else{
				$('#container-profile-other-inside-frame').css("grid-template-columns", "repeat(3, 1fr)");
			}
		}
	}else{//regular profile
		if(isFriendsProfilePageOpen == false){
			//alert('ad');
			if($(window).width() < 1100){
				$('#container-profile-inside-frame').css("grid-template-columns", "repeat(1, 1fr)");
			}else if($(window).width() < 1625){
				$('#container-profile-inside-frame').css("grid-template-columns", "repeat(2, 1fr)");
			}else{
				$('#container-profile-inside-frame').css("grid-template-columns", "repeat(3, 1fr)");
			}
		}else if(isFriendsProfilePageOpen == true){
			//alert('ac');
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

}

function hoverDivPicture(e){
	var left  = e.clientX  + "px";
	var top  = e.clientY  + "px";

	var div = document.getElementById('container-liked-picture-list');

	div.style.left = left;
	div.style.top = top;
	$('#container-liked-picture-list').css('left',left);
	$('#container-liked-picture-list').css('top',top);
	$('#container-liked-picture-list').css('position','fixed');
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
		if(wasFullContainerLoadedFromNotificationPage)
			wasFullContainerLoadedFromNotificationPage = false;
	}else{
		if(isOpenedNews){
			toggleNews();
		}
		//for opened profile
		if(isOpenedProfile == true){
			//select it from somewhere elese
			hideProfile();
		}else if(isOpenedOtherProfile == true){
			//do it naturally
			loadedFromOtherProfile = 1;
			hideOtherProfile();
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
				x.getElementsByTagName('img')[0].src = postImage;
				x.getElementsByTagName('h3')[1].innerHTML = postAuthor;
				x.getElementsByTagName('h4')[0].innerHTML = "Published on " + postDate;
			}
		);

		x = document.getElementById('container-full-text-content');
		x.getElementsByTagName('p')[0].innerHTML = postContent;
		x.getElementsByTagName('p')[1].innerHTML = postId;
		document.getElementById('container-full-comment-section').getElementsByTagName('span')[0].innerHTML = postId;




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

		//showing it
		let fullContainer = document.getElementById('container-full-frame');
		fullContainer.style.display = "block";

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
			document.getElementById('container-forgotPassword-frame').style.display = "none";
			forgotPasswordStep = 0;
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

//function for canceling updating bio - used twice so it needs to be sepparate to avoid repetition
var originalBio = "";
function cancelBioParagraphProfileFunction(){
	//alert('canceling it');
	//change textarea into p
	let bioTextArea = document.getElementsByName('_bioTextAreaProfile')[0];
	let bioParagraph = document.createElement('p');
	bioParagraph.innerHTML = originalBio;
	bioParagraph.setAttribute("name", "_bioParagraphProfile");
	bioTextArea.parentNode.replaceChild(bioParagraph, bioTextArea);

	//change buttons
	let btnUpdate = document.getElementsByName('_editBioParagraphProfile')[0];
	btnUpdate.innerHTML = "Edit";
	let btnCancel = document.getElementsByName('_cancelBioParagraphProfile')[0];
	//document.getElementById('container-profile-header').parentNode.removeChild(btnCancel);
	$('#container-profile-header').children().last().remove();
	isOpenedBioEditMode = false;
}

var isOpenedProfile = false;
var isOpenedBioEditMode = false;

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

			changeGridColumns();
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

			//add event for edit bio button
			$('[name=_editBioParagraphProfile]').on('click', function(){
				alert('called click');
				if(isOpenedBioEditMode == false){
					//alert('opening it');

					//change p into textarea
					let bioParagraph = document.getElementsByName('_bioParagraphProfile')[0];
					let bioTextArea = document.createElement('textarea');
					originalBio = bioParagraph.innerHTML;
					bioTextArea.value = bioParagraph.innerHTML;
					bioTextArea.setAttribute("name", "_bioTextAreaProfile");
					bioParagraph.parentNode.replaceChild(bioTextArea, bioParagraph);

					//change button
					let btnEdit = document.getElementsByName('_editBioParagraphProfile')[0];
					btnEdit.innerHTML = "Update";
					let btnCancel = document.createElement('button');
					btnCancel.setAttribute("class", "formButton");
					btnCancel.setAttribute("name", "_cancelBioParagraphProfile");
					btnCancel.innerHTML = "Cancel";
					document.getElementById('container-profile-header').appendChild(btnCancel);
					$('[name=_cancelBioParagraphProfile]').click(cancelBioParagraphProfileFunction);
					event.stopPropagation();
					isOpenedBioEditMode = true;
				}else if(isOpenedBioEditMode == true){
					//alert('updating it');
					//change textarea into p
					let bioTextArea = document.getElementsByName('_bioTextAreaProfile')[0];
					let bioParagraph = document.createElement('p');
					bioParagraph.innerHTML = bioTextArea.value;
					bioParagraph.setAttribute("name", "_bioParagraphProfile");
					bioTextArea.parentNode.replaceChild(bioParagraph, bioTextArea);

					//change buttons
					let btnUpdate = document.getElementsByName('_editBioParagraphProfile')[0];
					btnUpdate.innerHTML = "Edit";
					let btnCancel = document.getElementsByName('_cancelBioParagraphProfile')[0];
					//document.getElementById('container-profile-header').parentNode.removeChild(btnCancel);
					$('#container-profile-header').children().last().remove();
					//insert into DB
					$.ajax({
						type: "POST",
						url: "Includes/updateBio.php",
						data: {
							_userId: document.getElementsByName('_loggedUserId')[0].value,
							_bio: bioParagraph.innerHTML
						},
						success: function(){
							//success
						}
					});

					isOpenedBioEditMode = false;
				}
			});
		}else{

			$('#container-profile-inside-frame').css("display", "grid");
			$('#container-profile-inside-frame').css("height", "auto");
			isFriendsProfilePageOpen = false;
			isOpenedProfile = false;
			if(isOpenedBioEditMode){
				cancelBioParagraphProfileFunction();
				isOpenedBioEditMode = false;
			}
			if(isProfileOptionsList){
				toggleProfileOptionsList();
			}
			profileContainer.style.display = "none";

			//changeBodyOpacity(false);
			toggleOverlay('profileContainer');
			changeSelectedButton(0);

		}
	}else{
		//opening from fullcontainer
		toggleFullContainer();
		loadProfileOptionsHeaderData();

		profileContainer.style.display = "block";
		if(isOpenedProfile == false)
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
		isOpenedProfile = true;
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
				//adding clicking event for marking them as read - or on hover
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
		document.getElementById("overlay").style.display = "block";
		isOpenedOverlay = true;
		//changing z-index
		if(type == 'fullContainer')
			document.getElementById("container-full-frame").style.zIndex = "5";
		else if(type == 'profileContainer')
			document.getElementById("container-profile-frame").style.zIndex = "5";
		else if(type == 'otherProfileContainer')
			document.getElementById('container-profile-other-frame').style.zIndex = "5";
		else if(type == 'pictureContainer'){
			document.getElementById('container-picture-frame').style.zIndex = "6";
		}
	}else if(isOpenedOverlay == true){

		document.getElementById("overlay").style.display = "none";
		isOpenedOverlay = false;
		//changing z-index
		if(type == 'fullContainer'){
			document.getElementById("container-full-frame").style.zIndex = "3";
		}else if(type == 'profileContainer'){
			document.getElementById("container-profile-frame").style.zIndex = "3";
		}else if(type == 'otherProfileContainer'){
			document.getElementById('container-profile-other-frame').style.zIndex = "3";
		}else if(type == 'pictureContainer'){
			if(isOpenedPictureContainer == true){

			}else{
				isOpenedOverlay = true;
				document.getElementById("overlay").style.display = "block";
				document.getElementById("container-profile-frame").style.zIndex = "3";
				document.getElementById('container-picture-frame').style.zIndex = "6";
			}
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
		document.getElementById('container-add-comment').getElementsByTagName('textarea')[0].value = "";
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
		document.getElementById('container-add-share').getElementsByTagName('textarea')[0].value = "";
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

function acceptFriendRequest(idReq, localId){
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
					//show success message
					let successMessage = document.getElementsByName('_newsNotificationSuccessMessage')[0];
					successMessage.innerHTML = "Request accepted succesfully.";
					successMessage.style.display = "block";
					//enlarge frame and bring them back
					$('#container-news-frame').css("height", "448px");
				  setTimeout(function(){$(successMessage).fadeOut(1000, function(){
						$('#container-news-frame').css("height", "384px");
					});},2000);
				}
			);
			//load animation to announce that everything was fine
			if(isOpenedNotificationsPage){
				//hide that container
				const elements = document.getElementsByClassName('container-notifications-page-frame-freq');
				elements[localId].remove();
				togglePageNotifications('accept-frequest');
			}
		}
	});
}

function rejectFriendRequest(idReq, localId){
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
			//load animation to announce that everything was fine
			if(isOpenedNotificationsPage){
				//hide that container
				const elements = document.getElementsByClassName('container-notifications-page-frame-freq');
				elements[localId].remove();
				togglePageNotifications('reject-frequest');
			}
			//show success message
			let successMessage = document.getElementsByName('_newsNotificationSuccessMessage')[0];
			successMessage.innerHTML = "Request rejected succesfully.";
			successMessage.style.display = "block";
			//enlarge frame and bring them back
			$('#container-news-frame').css("height", "448px");
			setTimeout(function(){$(successMessage).fadeOut(1000, function(){
				$('#container-news-frame').css("height", "384px");
			});},2000);
		}
	});
}

function clickNewsNotification(containerId){
	toggleOtherProfile(document.getElementsByName('_newsNotificationClickable')[containerId*3+2].innerHTML,"_local");
}

function clickNewsNotificationPost(idPost){
	wasFullContainerLoadedFromNotificationPage = true;
	//make new function
	$('#container-full-frame').load(
		'Includes/loadContainerFullFrameNotification.php',
		{
			_idPost: idPost
		}, function(){
			//hiding news notifications
			if(isOpenedNews)
				toggleNews();

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
							//delete notifications in excess
							deleteNotificationExcess(document.getElementsByName('_authorOfPost')[0].innerHTML);
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
						//update notification unread
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
						//delete notifications in excess
						deleteNotificationExcess(document.getElementsByName('_authorOfPost')[0].innerHTML);
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
						//delete notifications in excess
						deleteNotificationExcess(document.getElementsByName('_authorOfPost')[0].innerHTML);
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
		}
	);
}

var wasFullContainerLoadedFromNotificationPage = false;

function markNotificationAsRead(idNotif){
	if(wasFullContainerLoadedFromNotificationPage == true){
		//alert('asd');
	}
	$.ajax({
		type: "POST",
		url: "Includes/markNotificationAsRead.php",
		data: {
			_idNotif: idNotif
		},
		success: function(){
			//reload news notifications
			let userId = document.getElementsByName('_loggedUserId')[0].value;
			//for loading news notifications
			$('#container-news-inside-frame').load(
				"Includes/loadNewsNotifications.php",
				{
					_userId: userId
				}
			);

			//reload unread counter
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

			//if notification page is opened, reload it
			if(isOpenedNotificationsPage == true){
				togglePageNotifications();
				//toggling overlay
				//toggleOverlay('fullContainer');
			}


		}
	});
}

isOpenedNotificationsPage = false;

function togglePageNotifications(typeOf){
	let userId = document.getElementsByName('_loggedUserId')[0].value;
	$('#content').load(
		"Includes/loadNewsNotificationsPage.php",
		{
			_userId: userId
		}, function(){
			isOpenedNotificationsPage = true;
			//change the display of content
			$('#content').css("display", "block");
			document.getElementById('container-help-button').style.display = "none";
			//toggle notification thingy
			if(isOpenedNews){
				toggleNews();
			}
			//for accepting/rejecting frequests or deleteing notifications MESSAGES
			if(document.getElementsByName('_successFriendRequestFromNotifications')[0]){
				let successMessage;
				successMessage = document.getElementsByName('_successFriendRequestFromNotifications')[0];
				switch(typeOf){
					case 'accept-frequest':
						//show success message
						document.getElementsByName('_successFriendRequestFromNotifications')[0].innerHTML = "Friend request accepted succesfully.";
						successMessage.style.display = "block";
						setTimeout(function(){$(successMessage).fadeOut(1000);},3000);
						break;
					case 'reject-frequest':
						//show success message
						document.getElementsByName('_successFriendRequestFromNotifications')[0].innerHTML = "Friend request rejected succesfully.";
						successMessage.style.display = "block";
						setTimeout(function(){$(successMessage).fadeOut(1000);},3000);
						break;
					case 'delete-notification':
						//show success message
						document.getElementsByName('_successFriendRequestFromNotifications')[0].innerHTML = "Notification deleted succesfully.";
						successMessage.style.display = "block";
						setTimeout(function(){$(successMessage).fadeOut(1000);},3000);
						break;
					default:
						break;
				}
			}
		}
	);
}

//function which deletes selected notification
function deleteNotification(idNotif){
	$.ajax({
		type: "POST",
		url: "Includes/deleteNotification.php",
		data: {
			_idNotif: idNotif
		},
		success: function(){
			//reload notificationsPage
			togglePageNotifications('delete-notification');
		}
	});
}

function deleteNotificationExcess(idUserToSee){
	$.ajax({
		type: "POST",
		url: "Includes/deleteNotificationExcess.php",
		data: {//you are not passing the right id
			_idUser: idUserToSee
		},
		success: function(){
			//reload notificationsPage

		}
	});
}

function likeComment(){
	//alert('liked');
	alert('Cooming soon');
}

function commentOnComment(){
	alert('Cooming soon');
}

function reportComment(){
	alert('Coming soon');
}
