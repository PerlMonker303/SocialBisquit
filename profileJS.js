
var indexMenuButtonSelected = 1;
var isSetupProfilePageOpened = false;

//function for changing menu selected
//adding loading as well for posts
function changeSelectedButton(buttonIndex){
  switch(buttonIndex){
    case 0:
      document.getElementsByName('_profileMenuButton1')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton2')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton3')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton4')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton5')[0].style.backgroundColor = "#d63e34";
      break;
    case 1:
      document.getElementsByName('_profileMenuButton1')[0].style.backgroundColor = "#b3382c";
      document.getElementsByName('_profileMenuButton2')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton3')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton4')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton5')[0].style.backgroundColor = "#d63e34";
      break;
    case 2:
      document.getElementsByName('_profileMenuButton1')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton2')[0].style.backgroundColor = "#b3382c";
      document.getElementsByName('_profileMenuButton3')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton4')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton5')[0].style.backgroundColor = "#d63e34";
      break;
    case 3:
      document.getElementsByName('_profileMenuButton1')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton2')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton3')[0].style.backgroundColor = "#b3382c";
      document.getElementsByName('_profileMenuButton4')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton5')[0].style.backgroundColor = "#d63e34";
      break;
    case 4:
      document.getElementsByName('_profileMenuButton1')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton2')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton3')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton4')[0].style.backgroundColor = "#b3382c";
      document.getElementsByName('_profileMenuButton5')[0].style.backgroundColor = "#d63e34";
      break;
    case 5:
      document.getElementsByName('_profileMenuButton1')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton2')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton3')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton4')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_profileMenuButton5')[0].style.backgroundColor = "#b3382c";
    default:
      break;
  }
}

function changeSelectedButtonOther(buttonIndex){
  switch(buttonIndex){
    case 0:
    document.getElementsByName('_otherprofileMenuButton1')[0].style.backgroundColor = "#d63e34";
    document.getElementsByName('_otherprofileMenuButton2')[0].style.backgroundColor = "#d63e34";
    document.getElementsByName('_otherprofileMenuButton3')[0].style.backgroundColor = "#d63e34";
      break;
    case 1:
      document.getElementsByName('_otherprofileMenuButton1')[0].style.backgroundColor = "#b3382c";
      document.getElementsByName('_otherprofileMenuButton2')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_otherprofileMenuButton3')[0].style.backgroundColor = "#d63e34";
      break;
    case 2:
      document.getElementsByName('_otherprofileMenuButton1')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_otherprofileMenuButton2')[0].style.backgroundColor = "#b3382c";
      document.getElementsByName('_otherprofileMenuButton3')[0].style.backgroundColor = "#d63e34";
      break;
    case 3:
      document.getElementsByName('_otherprofileMenuButton1')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_otherprofileMenuButton2')[0].style.backgroundColor = "#d63e34";
      document.getElementsByName('_otherprofileMenuButton3')[0].style.backgroundColor = "#b3382c";
      break;
    default:
      break;
  }
}

var isLoadingProfilePages = false;

//for loading profile options header data
function loadProfileOptionsHeaderData(){
  $('[name=_loadProfileOptionsHeader]').load(
    "Includes/loadProfileOptionsHeader.php",
    {
      _userId: document.getElementsByName('_loggedUserId')[0].value
    }, function(){
      if(document.getElementById('container-profile-options-frame').getElementsByTagName('table')[0].getElementsByTagName('h4')[0]){
        if(document.getElementById('container-profile-options-frame').getElementsByTagName('table')[0].getElementsByTagName('h4')[0].innerHTML = "You have not set up your profile yet."){
          //for showing setupProfileForm
          let userId = document.getElementsByName('_loggedUserId')[0].value;
          $('[name=_showProfileSetupForm]').click(function(){
            isSetupProfilePageOpened = true;
            changeSelectedButton(0);
            $('#container-profile-inside-frame').css("display", "block");
            $('#container-profile-inside-frame').load(
              "Includes/loadSetupProfile.php"
            );
          });
        }
      }
    }
  );
}

var loggedUserId = 0;
var isFriendsProfilePageOpen = false;

$(document).ready(function(){
  if(document.getElementById('_secretUserId'))
    loggedUserId = document.getElementById('_secretUserId').innerHTML;
  //for loading profile options header data
  loadProfileOptionsHeaderData();

  //getting user id
  if(document.getElementsByName('_loggedUserId')[0]){
    let userId = document.getElementsByName('_loggedUserId')[0].value;
    $('[name=_profileMenuButton1]').click(function(){
      if(isLoadingProfilePages == false){
        isLoadingProfilePages = true;
        isFriendsProfilePageOpen = false;
        changeSelectedButton(1);
        $('#container-profile-inside-frame').css("grid-template-columns", "repeat(1, 1fr)");
        document.getElementById('container-profile-inside-frame').innerHTML = "Loading content...";
        $('#container-profile-inside-frame').load(
          "Includes/loadPostsProfile.php",
          {
            _userId: userId
          },function(){//success function
            isLoadingProfilePages = false;
            isSetupProfilePageOpened = false;
            $('#container-profile-inside-frame').css("display", "grid");
            $('#container-profile-inside-frame').css("height", "auto");
            changeGridColumns();
          }
        );
        }
      });
    }

    $('[name=_profileMenuButton2]').click(function(){
      if(isLoadingProfilePages == false){
        isLoadingProfilePages = true;
        isFriendsProfilePageOpen = false;
        changeSelectedButton(2);
        $('#container-profile-inside-frame').css("grid-template-columns", "repeat(1, 1fr)");
        document.getElementById('container-profile-inside-frame').innerHTML = "Loading content...";
        $('#container-profile-inside-frame').load(
          "Includes/loadSharesProfile.php",
          {
            _userId: userId
          },function(){//success function
            isLoadingProfilePages = false;
            isSetupProfilePageOpened = false;
            $('#container-profile-inside-frame').css("display", "grid");
            $('#container-profile-inside-frame').css("height", "auto");
            changeGridColumns();
            //for clicking options button on post
          	$('#share-option-button').click(function()
          	{
          		toggleShareOptionMenu();
          	});
          }
        );
      }
      });

    $('[name=_profileMenuButton3]').click(function(){
      if(isLoadingProfilePages == false){
        isLoadingProfilePages = true;
        isFriendsProfilePageOpen = true;
        changeSelectedButton(3);
        $('#container-profile-inside-frame').css("grid-template-columns", "repeat(1, 1fr)");
        document.getElementById('container-profile-inside-frame').innerHTML = "Loading content...";
        $('#container-profile-inside-frame').load(
          "Includes/loadFriendsProfile.php",
          {
            _userId: userId
          },function(){//success function
            isLoadingProfilePages = false;
            isSetupProfilePageOpened = false;
            $('#container-profile-inside-frame').css("display", "grid");
            $('#container-profile-inside-frame').css("height", "auto");
            changeGridColumns();
          }
        );
        }
      });

    $('[name=_profileMenuButton4]').click(function(){
      if(isLoadingProfilePages == false){
        isLoadingProfilePages = true;
        isFriendsProfilePageOpen = false;
        changeSelectedButton(4);
        document.getElementById('container-profile-inside-frame').innerHTML = "Loading content...";
        $('#container-profile-inside-frame').load(
          "Includes/loadMessagesProfile.php",
          {
            _userId: userId
          },function(){//success function
            isLoadingProfilePages = false;
            isSetupProfilePageOpened = false;
            $('#container-profile-inside-frame').css("display", "block");
            $('#container-profile-inside-frame').css("height", "auto");
            changeGridColumns();
            //delete this when adding messages!!!
            //$('#container-profile-inside-frame').css("grid-template-columns", "repeat(1, 1fr)");
          }
        );
        }
      });

    $('[name=_profileMenuButton5]').click(selectSettingsMenu);

  //for showing setupProfileForm
  let userId = document.getElementsByName('_loggedUserId')[0].value;
  $('[name=_showProfileSetupForm]').click(function(){
    isSetupProfilePageOpened = true;
    changeSelectedButton(0);
    $('#container-profile-inside-frame').css("display", "block");
    $('#container-profile-inside-frame').load(
      "Includes/loadSetupProfile.php"
    );
  });
  //for toggling other profile
	$('[name=_toggleOtherProfile]').click(toggleOtherProfile);

  //FOR PRESSING BUTTONS ON OTHER PROFILE MENU
  $('[name=_otherprofileMenuButton1]').click(function(){
    changeSelectedButtonOther(1);
    $('#container-profile-other-inside-frame').load(
      "Includes/loadPostsProfile.php",
      {
        _userId: otherUserId
      },function(){//success
        changeGridColumns('otherProfile');
        //hiding settings button
        var index = 0;
        while(document.getElementsByClassName('post-option-button')[index])
          document.getElementsByClassName('post-option-button')[index++].style.display = "none";
      }
    );
  });

  $('[name=_otherprofileMenuButton2]').click(function(){
    changeSelectedButtonOther(2);
    $('#container-profile-other-inside-frame').load(
      "Includes/loadSharesProfile.php",
      {
        _userId: otherUserId
      },function(){//success
        changeGridColumns('otherProfile');
        //hiding settings button
        var index = 0;
        while(document.getElementsByClassName('share-option-button')[index])
          document.getElementsByClassName('share-option-button')[index++].style.display = "none";
      }
    );
  });

  $('[name=_otherprofileMenuButton3]').click(function(){
    changeSelectedButtonOther(3);
    $('#container-profile-other-inside-frame').load(
      "Includes/loadFriendsProfile.php",
      {
        _userId: otherUserId
      },function(){//success
        $('#container-profile-other-inside-frame').css("display", "grid");
        changeGridColumns('otherProfile');
      }
    );
  });

  //arrays
  for(let i=0;i<1001;i++){
    isPostOptionMenuOpen[i] = false;
    isShareOptionMenuOpen[i] = false;
  }
});

//function for settings menu - I made it separately because this menu is opened by two triggers
function selectSettingsMenu(){

  if(isLoadingProfilePages == false){
    isLoadingProfilePages = true;
    isFriendsProfilePageOpen = false;
    changeSelectedButton(5);
    document.getElementById('container-profile-inside-frame').innerHTML = "Loading content...";
    $('#container-profile-inside-frame').load(
      "Includes/loadProfileSettingsPage.php",
      {
        _userId: document.getElementsByName('_loggedUserId')[0].value
      },function(){
        //success function
        //do the same as above
        isLoadingProfilePages = false;
        isSetupProfilePageOpened = false;
        $('#container-profile-inside-frame').css("display", "block");
        $('#container-profile-inside-frame').css("height", "200px");
        //load first selected settings page
        $('#settings-main-inner-pane').load(
          'Includes/loadProfileSettings1.php'
        );
        //load events for menu options
        $('[name=_settingsMenuOption1]').click(function(){
          $('#settings-main-inner-pane').load(
            'Includes/loadProfileSettings1.php'
          );
        });
        $('[name=_settingsMenuOption2]').click(function(){
          $('#settings-main-inner-pane').load(
            'Includes/loadProfileSettings2.php'
          );
        });
      }
    );
  }
}

let otherUserId = 0;

function openAProfile(userId){
  if(userId == document.getElementsByName('_loggedUserId')[0].value){
    //opening the user's profile
    toggleProfile();
  }else{
    //opening another profile
    toggleOtherProfile(userId, "_local");
  }
  //for hiding success message for friend adding
  document.getElementsByName('container-profile-other-success-message')[0].style.display = "none";
}

//for clicking on another user's profile
var loadedFromProfile = 0;
var loadedFromOtherProfile = 0;
var isOpenedOtherProfile = false;

function toggleOtherProfile(contId, from){
  if(isFullContainerOpen == true){
    toggleFullContainer();
    isOpenedOtherProfile = true;

    otherUserId = contId;

    toggleOverlay('otherProfileContainer');
    document.getElementById('container-profile-other-frame').style.display = "block";


    //for loading the profile
    $('#div-to-load-other-profile').load(
      "Includes/loadOtherProfile.php",
      {
        _userId: otherUserId,
        _loggedUserId: loggedUserId
      }, function(){//success function - loading the posts
        $('#container-profile-other-inside-frame').load(
          "Includes/loadPostsProfile.php",
          {
            _userId: otherUserId
          },function(){
            //hiding settings button
            var index = 0;
            while(document.getElementsByClassName('post-option-button')[index])
              document.getElementsByClassName('post-option-button')[index++].style.display = "none";
          }
        );
        changeGridColumns('otherProfile');
        changeSelectedButtonOther(1);
        //loading added button script
        $('[name=_otherprofileMenuButton4]').load(
          "Includes/checkUserAdded.php",
          {
            _userId: otherUserId,
            _loggedUserId: document.getElementsByName('_loggedUserId')[0].value
          }
        );
      }
    );

  }else{
    if(isOpenedOtherProfile == false){
      isOpenedOtherProfile = true;
      if(isOpenedProfile == true){
        toggleProfile();
        loadedFromProfile = 1;
      }

      //hide news
      if(isOpenedNews == true)
        toggleNews();

      //loading script!!!!!!this shouldn't be inserted manually
      if(from == "_local"){
        otherUserId = contId;
      }else{
        if(document.getElementsByClassName('container-friend')[contId-1])
          otherUserId = document.getElementsByClassName('container-friend')[contId-1].getElementsByTagName('span')[2].innerHTML;
      }

      //for loading the back button
      if(loadedFromProfile == 1){
        $('#container-profile-other-back').load(
          "Includes/loadOtherProfileBackButton.php",
          {
            _comingFromProfilePage: loadedFromProfile
          }, function(){
            loadedFromOtherProfile = 0;
          }
        );
      }
      //for loading the profile
      $('#div-to-load-other-profile').load(
        "Includes/loadOtherProfile.php",
        {
          _userId: otherUserId,
          _loggedUserId: loggedUserId
        }, function(){//success function - loading the posts
          $('#container-profile-other-inside-frame').load(
            "Includes/loadPostsProfile.php",
            {
              _userId: otherUserId
            },function(){
              //hiding settings button
              var index = 0;
              while(document.getElementsByClassName('post-option-button')[index])
                document.getElementsByClassName('post-option-button')[index++].style.display = "none";
            }
          );
          changeGridColumns('otherProfile');
          changeSelectedButtonOther(1);
          //loading added button script
          $('[name=_otherprofileMenuButton4]').load(
            "Includes/checkUserAdded.php",
            {
              _userId: otherUserId,
              _loggedUserId: document.getElementsByName('_loggedUserId')[0].value
            }
          );
        }
      );

      //showing
      document.getElementById('container-profile-other-frame').style.display = "block";
      toggleOverlay('otherProfileContainer');

    }else if(isOpenedOtherProfile == true){

      isOpenedOtherProfile = false;
      document.getElementById('container-profile-other-frame').style.display = "none";
      toggleOverlay('otherProfileContainer');
      changeSelectedButtonOther(0);

      if(loadedFromProfile == 1){
				//hiding back button
				document.getElementsByName('_goBackToProfile')[0].style.display = "none";
				loadedFromProfile = 0;
        //when loading another user's profile from another user's profile but after accessing it from your profile

        //remove all elements from profile, class .container-friend
        var toDelete = document.getElementById('container-profile-inside-frame').getElementsByClassName('container-friend');
        for(let i=toDelete.length;i--;){
          document.getElementById('container-profile-inside-frame').removeChild(document.getElementById('container-profile-inside-frame').getElementsByClassName('container-friend')[i]);
        }

        if(document.getElementsByClassName('container-friend')[contId-1]){
          otherUserId = document.getElementsByClassName('container-friend')[contId-1].getElementsByTagName('span')[2].innerHTML;
          loadedFromProfile = 0;
          if(otherUserId == loggedUserId){
            //load your own profile
            toggleProfile();
          }else{
            //load other user's profile
            toggleOtherProfile(otherUserId);
          }
        }
			}else{

        //when loading another user's profile from another user's profile

        //remove all elements from profile, class .container-friend
        var toDelete = document.getElementById('container-profile-inside-frame').getElementsByClassName('container-friend');
        for(let i=toDelete.length;i--;){
          document.getElementById('container-profile-inside-frame').removeChild(document.getElementById('container-profile-inside-frame').getElementsByClassName('container-friend')[i]);
        }

        if(document.getElementsByClassName('container-friend')[contId-1]){
          otherUserId = document.getElementsByClassName('container-friend')[contId-1].getElementsByTagName('span')[2].innerHTML;
          if(otherUserId == loggedUserId){
            //load your own profile
            toggleProfile();
          }else{
            //load other user's profile
            toggleOtherProfile(otherUserId);
          }

        }
      }

      //work here - something's not alright

    }
  }
  //scroll to top
  document.body.scrollTop = 0; //for safari
  document.documentElement.scrollTop = 0; //for the rest
}

//for toggling secret checkbox
function secret_checkbox(){
  let x = document.getElementById('secretCheckbox');
  if(x.checked){
    document.getElementById('secret-input').type = "text";
  }else{
    document.getElementById('secret-input').type = "password";
  }
}

//for reseting profile setup
function resetProfileSetup(){
	let x;
	x = document.getElementsByName('setup_el1')[0];
	x.value = "";
	x = document.getElementsByName('setup_el2')[0];
	x.value = "";
	x = document.getElementsByName('setup_el3')[0];
	x.value = "";
	x = document.getElementsByName('setup_el4')[0];
	x.value = "";
	x = document.getElementsByName('setup_el5')[0];
	x.value = "";
	x = document.getElementsByName('setup_el6')[0];
	x.value = "";
	x = document.getElementsByName('setup_el7')[0];
	x.value = "";
	x = document.getElementsByName('setup_el8')[0];
	x.value = "";
	x = document.getElementsByName('setup_el9')[0];
	x.value = "";
	x = document.getElementsByName('setup_el10')[0];
	x.value = "";
	x = document.getElementsByName('setup_el11')[0];
	x.value = "";
}

//function for adding friends
function toggleFriend(){
  let text = document.getElementsByName('_otherprofileMenuButton4')[0].getElementsByTagName('h3')[0].innerHTML;
  let url = "";
  let successMessage = document.getElementsByName('container-profile-other-success-message')[0];
  successMessage.innerHTML = "Default message";
  successMessage.style.display = "none";
  if(text == "Added"){
    //call script for deleting friendship
    url = "Includes/deleteFriend.php";
    successMessage.innerHTML = "Deleted from contacts";
  }else if(text == "Add friend"){
    //call script for adding friends
    url = "Includes/sendFriendRequest.php";
    let userName = document.getElementById('container-profile-other-header').getElementsByTagName('span')[0].innerHTML;
    userName+=(" "+document.getElementById('container-profile-other-header').getElementsByTagName('span')[1].innerHTML);
    successMessage.innerHTML = "A friend request has been sent to "+userName;
  }else if(text == "Request sent"){
    //delete the request
    url = "Includes/deleteFriendRequest.php";
    successMessage.innerHTML = "Request canceled";
  }else if(text == "Accept request"){
    //accepting the request from profile
    url = "Includes/acceptFrequestFromProfile.php";
    successMessage.innerHTML = "Request accepted";
  }

  $('[name=_otherprofileMenuButton4]').load(
    url,
    {
      _userId: document.getElementsByName('_loggedUserId')[0].value,
      _friendId: otherUserId
    }, function(){
      if(text == "Request sent")
        document.getElementsByName('_otherprofileMenuButton4')[0].getElementsByTagName('h3')[0].innerHTML = "Add friend";
      else if(text == "Add friend")
        document.getElementsByName('_otherprofileMenuButton4')[0].getElementsByTagName('h3')[0].innerHTML = "Request sent";
      else if(text == "Accept request")
        document.getElementsByName('_otherprofileMenuButton4')[0].getElementsByTagName('h3')[0].innerHTML = "Added";
    }
  );


  successMessage.style.display = "block";

  setTimeout(function(){$(successMessage).fadeOut(1000);},2000);


}

var isPostOptionMenuOpen = new Array(1001);
var isShareOptionMenuOpen = new Array(1001);

//for posts/shares options menu
function togglePostOptionMenu(index){
  if(isPostOptionMenuOpen[index] == false){
    isPostOptionMenuOpen[index] = true;
    document.getElementsByClassName('post-option-text')[index].style.display = "block";
  }else{
    isPostOptionMenuOpen[index] = false;
    document.getElementsByClassName('post-option-text')[index].style.display = "none";
  }
}

function deletePostOption(index, id){
  //calling deletion script
  $.ajax({
    type: "POST",
    url: "Includes/deleteSelectedPost.php",
    data: {
      idOfPost: id
    },
    success: function(){
      //show success message
      //show success message
      let successMessage = document.getElementsByName('container-profile-success-message')[0];
      successMessage.innerHTML = "Post deleted";
      successMessage.style.display = "block";
      setTimeout(function(){$(successMessage).fadeOut(1000);},2000);
      //scroll to top
			document.body.scrollTop = 0; //for safari
			document.documentElement.scrollTop = 0; //for the rest
      //loading posts on profile
      let userId = document.getElementsByName('_loggedUserId')[0].value;
      $('#container-profile-inside-frame').load(
		    "Includes/loadPostsProfile.php",
		    {
		      _userId: userId
		    },function(){//success function
					isLoadingProfilePages = false;
          $('#content').load(
        		"Includes/loadPostsMainPage.php",
        		{
        			_userId: userId
        		},function(){
              isOpenedOverlay = false;
              toggleOverlay('profileContainer');
            }
        	);
				}
		  );



    }
  });
  togglePostOptionMenu(index);
}

function toggleShareOptionMenu(index){
  if(isShareOptionMenuOpen[index] == false){
    isShareOptionMenuOpen[index] = true;
    document.getElementsByClassName('share-option-text')[index].style.display = "block";
  }else{
    isShareOptionMenuOpen[index] = false;
    document.getElementsByClassName('share-option-text')[index].style.display = "none";
  }
}

function deleteShareOption(index, id){
  //calling deletion script
  $.ajax({
    type: "POST",
    url: "Includes/deleteSelectedShare.php",
    data: {
      idOfShare: id
    },
    success: function(){
      //show success message
      let successMessage = document.getElementsByName('container-profile-success-message')[0];
      successMessage.innerHTML = "Share deleted";
      successMessage.style.display = "block";
      setTimeout(function(){$(successMessage).fadeOut(1000);},2000);
      //scroll to top
			document.body.scrollTop = 0; //for safari
			document.documentElement.scrollTop = 0; //for the rest
      //loading shares on profile
      let userId = document.getElementsByName('_loggedUserId')[0].value;
      $('#container-profile-inside-frame').load(
		    "Includes/loadSharesProfile.php",
		    {
		      _userId: userId
		    },function(){//success function
					isLoadingProfilePages = false;
				}
		  );
    }
  });
  toggleShareOptionMenu(index);
}
