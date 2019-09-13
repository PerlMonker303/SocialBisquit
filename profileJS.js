
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

function updateProfileSetup(){
  //checking if everything is alright
  let setup1 = document.getElementsByName('setup_el1')[0].value;
  let setup2 = document.getElementsByName('setup_el2')[0].value;
  let setup3 = document.getElementsByName('setup_el3')[0].value;
  let setup5 = document.getElementsByName('setup_el5')[0].value;
  let setup6 = document.getElementsByName('setup_el6')[0].value;
  let setup7 = document.getElementsByName('setup_el7')[0].value;
  let setup8 = document.getElementsByName('setup_el8')[0].value;
  let setup9 = document.getElementsByName('setup_el9')[0].value;
  let setup10 = document.getElementsByName('setup_el10')[0].value;
  let setup11 = document.getElementsByName('setup_el11')[0].value;
  if(setup1 && setup2 && setup3 && setup5 && setup6 && setup7 && setup8 && setup9 && setup10 && setup11){
    //check if date of birth is before today
    let todaysDate = new Date();
    let newtodaysDate = todaysDate.getFullYear() + "-" + appendLeadingZeros(todaysDate.getMonth() + 1) + "-" + appendLeadingZeros(todaysDate.getDate());
    if(newtodaysDate <= setup3){
      let successMessage = document.getElementById('profile-setup-success');
      successMessage.style.display = "block";
      successMessage.innerHTML = '<h3>*You must enter a valid date of birth.</h3>'
      setTimeout(function(){$(successMessage).fadeOut(1000);},2000);
    }else{
      //updating data
      $.ajax({
        type: "POST",
        url: "Includes/update.php",
        data: {
          _setup_el1: setup1,
          _setup_el2: setup2,
          _setup_el3: setup3,
          _setup_el5: setup5,
          _setup_el6: setup6,
          _setup_el7: setup7,
          _setup_el8: setup8,
          _setup_el9: setup9,
          _setup_el10: setup10,
          _idUser: document.getElementsByName('_loggedUserId')[0].value
        },
        complete: function(){
          //after the information has been introduced succesfully, the next script will be called
          //which will update the image path to the user's profile image
          $('[name=setup_el11]').on('change', function(event){
            //updating images
            let file = event.target.files[0];
            let formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            axios({
              url: CLOUDINARY_URL,
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: formData
            }).then(function(res){
              console.log(res);

              //here u call the script to modify the DB as well
              //bc the upload is done here in js - see above with axios
              $.ajax({
                type: "POST",
                url: "Includes/updatePicture.php",
                data: {
                  _url: res.data.secure_url,
                  _idUser: document.getElementsByName('_loggedUserId')[0].value
                }
              });
            }).catch(function(err){
              console.error(err);
            });
          });
          $('[name=setup_el11]').trigger('change');
          //then you display the success message, and then the page reloads
          let successMessage = document.getElementById('profile-setup-success');
          successMessage.style.display = "block";
          successMessage.innerHTML = '<h3>Profile updated succesfully.</h3>'
          setTimeout(function(){$(successMessage).fadeOut(1000,
          function(){
            location.reload();
          });},2000);
          resetProfileSetup();
        }
      });
    }

  }else{
    let successMessage = document.getElementById('profile-setup-success');
    successMessage.style.display = "block";
    successMessage.innerHTML = '<h3>*All fields must be filled.</h3>'
    setTimeout(function(){$(successMessage).fadeOut(1000);},2000);
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
            $('#container-profile-inside-frame').css("height", "auto");
            $('#container-profile-inside-frame').load(
              "Includes/loadSetupProfile.php",
              function(){
                //func with change
              }
            );



          });
        }
      }
    }
  );
}

var loggedUserId = 0;
var isFriendsProfilePageOpen = false;
var isOpenedProfilePictureOption = false;
var isOpenedProfilePictureZoom = false;

var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/hgfmqcnjc/upload';
var CLOUDINARY_UPLOAD_PRESET = 'ox8ghzuy';

$(document).ready(function(){
  //getting the user id
  if(document.getElementById('_secretUserId'))
    loggedUserId = document.getElementById('_secretUserId').innerHTML;

  //add hover event for profile picture
  $('#container-profile-picture').mouseenter(function(){
    if(isOpenedProfilePictureOption == false){
      isOpenedProfilePictureOption = true;
      setTimeout(function(){$(document.getElementById('container-profile-picture-option')).fadeIn(400);},10);

    }
  });

  $('#container-profile-picture').mouseleave(function(){
    if(isOpenedProfilePictureOption == true){
      isOpenedProfilePictureOption = false;
      setTimeout(function(){$(document.getElementById('container-profile-picture-option')).fadeOut(400,
      function(){
        //document.getElementById('container-profile-picture-option').style.display = "none";
      });},10);


    }
  });

  //for clicking on the input/uploading file
  $('#container-profile-picture-option').click(function(){
    if(isOpenedProfilePictureZoom == true){
      event.stopPropagation();
    }
    document.getElementsByName('_changeProfilePictureInput')[0].click();
    //$('[name=_changeProfilePictureInput]').trigger('change');
  });

  //for zooming in on the profile picture on click
  $('#container-profile-picture').on('click', function(){
    isOpenedProfilePictureZoom = true;

    //zoom in the profile picture

    let picUrl = document.getElementById('container-profile-picture').getElementsByTagName('img')[0].src;
    togglePictureContainer(picUrl);

  });


  //for changing file
  $('[name=_changeProfilePictureInput]').change(function(event){
    let input = document.getElementsByName('_changeProfilePictureInput')[0];
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    }).then(function(res){
      console.log(res);

      //here u call the script to modify the DB as well
      //bc the upload is done here in js - see above with axios
      $.ajax({
        type: "POST",
        url: "Includes/updatePicture.php",
        data: {
          _url: res.data.secure_url,
          _idUser: document.getElementsByName('_loggedUserId')[0].value
        },
        complete: function(){
          document.getElementById('container-profile-picture').getElementsByTagName('img')[0].src = res.data.secure_url;

          let successMessage = document.getElementById('profile-picture-success-message');
          setTimeout(function(){$(successMessage).fadeIn(500);},0);
          setTimeout(function(){$(successMessage).fadeOut(1000);},2000);

        }
      });
    }).catch(function(err){
      console.error(err);
    });

  });


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
    $('#container-profile-inside-frame').css("height", "auto");
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

var isOpenedSettingsEditMode = false;
var settingsContainer;
var arrayInitialSettings = new Array();

function closeEditSettingsMode(){
  //close it
  isOpenedSettingsEditMode = false;

  settingsContainer = document.getElementsByClassName('settings-container');

  for(let i=0;i<settingsContainer.length;i++){
    let typeName = settingsContainer[i].getElementsByClassName('settings-container-title')[0].getElementsByTagName('span')[0].innerHTML;
    if(typeName != 'Date of registration'){

      if(typeName == 'Gender' || typeName == 'Looking for'){
        let inputTag = settingsContainer[i].getElementsByClassName('settings-container-option')[0].getElementsByTagName('select')[0];
        let spanArea = document.createElement('span');
        spanArea.innerHTML = inputTag.options[inputTag.selectedIndex].innerHTML;
        inputTag.parentNode.replaceChild(spanArea, inputTag);
        //adding colors
        if(spanArea.innerHTML == 'Male'){
          spanArea.style.color = '#001dff';
        }else if(spanArea.innerHTML == 'Female'){
          spanArea.style.color = '#9a0000';
        }
      }else{
        let inputTag = settingsContainer[i].getElementsByClassName('settings-container-option')[0].getElementsByTagName('input')[0];
        let spanArea = document.createElement('span');
        if(typeName == 'Date of birth'){
          spanArea.innerHTML = inputTag.value.toString();
        }else{
          spanArea.innerHTML = inputTag.value;
        }
        inputTag.parentNode.replaceChild(spanArea, inputTag);
      }
    }

  }

  //just change the image of button
  let oldButton = document.getElementsByName('settings-edit-button')[0];
  oldButton.src = "Icons/IconOptions.png";
  //remove cancel button
  $('#settings-main-inner-pane').children().last().remove();
}

function appendLeadingZeros(n){
  if(n <= 9){
    return "0" + n;
  }
  return n
}

function insideOfEditSettings(){
  if(isOpenedSettingsEditMode){

    settingsContainer = document.getElementsByClassName('settings-container');

    switch(openedSettingsPaneIndex){
      case 1:
        closeEditSettingsMode();
        //creating array with settings to be passed with jquery
        let arrayToBePassed = new Array();
        for(let i=0;i<settingsContainer.length;i++){
          arrayToBePassed.push(settingsContainer[i].getElementsByClassName('settings-container-option')[0].getElementsByTagName('span')[0].innerHTML);
        }
        $.ajax({
    			type: "POST",
    			url: "Includes/updateProfileSettings1.php",
    			data: {
            _settingsValues: arrayToBePassed,
            _idUser: document.getElementsByName('_loggedUserId')[0].value
    			},
    			success: function(){
            //check if any values need to be updated
            let ok = false, index = 0;
            while(!ok && index < settingsContainer.length){
              if(arrayInitialSettings[index] != arrayToBePassed[index]){
                ok = true;
              }
              index++;
            }
            let successMessage = document.getElementById('settings-container-success');
            if(ok){
              successMessage.innerHTML = "Profile updated succesfully.";
            }else{
              successMessage.innerHTML = "Everything is up to date.";
            }
            successMessage.style.display = "block";
            setTimeout(function(){$(successMessage).fadeOut(1000);},2000);
          }
    		});
        break;
      case 2:
        let successMessage = document.getElementById('settings-container-success');
        let todaysDate = new Date();
        let newtodaysDate = todaysDate.getFullYear() + "-" + appendLeadingZeros(todaysDate.getMonth() + 1) + "-" + appendLeadingZeros(todaysDate.getDate());
        if(!document.getElementsByClassName('settings-container')[2].getElementsByClassName('settings-container-option')[0].getElementsByTagName('input')[0].value ||
        document.getElementsByClassName('settings-container')[2].getElementsByClassName('settings-container-option')[0].getElementsByTagName('input')[0].value >= newtodaysDate){
          //show message
          successMessage.innerHTML = "Error: Date of birth must be filled with a valid value.";
          successMessage.style.display = "block";
          setTimeout(function(){$(successMessage).fadeOut(1000);},2000);
        }else{
          //creating array with settings to be passed with jquery
          let arrayToBePassed = new Array();
          for(let i=0;i<settingsContainer.length;i++){
            let typeName = settingsContainer[i].getElementsByClassName('settings-container-title')[0].getElementsByTagName('span')[0].innerHTML;
            if(typeName == 'Gender' || typeName == 'Looking for'){
              let selectOption = settingsContainer[i].getElementsByClassName('settings-container-option')[0].getElementsByTagName('select')[0];
              arrayToBePassed.push(selectOption.options[selectOption.selectedIndex].value);
            }else if(typeName == 'Date of birth'){
              //no need to change date format :)
              arrayToBePassed.push(settingsContainer[i].getElementsByClassName('settings-container-option')[0].getElementsByTagName('input')[0].value);
            }else{
              arrayToBePassed.push(settingsContainer[i].getElementsByClassName('settings-container-option')[0].getElementsByTagName('input')[0].value);
            }
          }

          $.ajax({
      			type: "POST",
      			url: "Includes/updateProfileSettings2.php",
      			data: {
              _settingsValues: arrayToBePassed,
              _idUser: document.getElementsByName('_loggedUserId')[0].value
      			},
      			success: function(){

            }
      		});
          $.ajax({
            type: "POST",
            url: "Includes/updateProfileSettings2.php",
            data: {
              _settingsValues: arrayToBePassed,
              _idUser: document.getElementsByName('_loggedUserId')[0].value
            },
            success: function(){
              //check if any values need to be updated
              let ok = false, index = 0;
              while(!ok && index < settingsContainer.length){
                if(arrayInitialSettings[index] != arrayToBePassed[index]){
                  ok = true;
                }
                index++;
              }
              let successMessage = document.getElementById('settings-container-success');
              if(ok){
                successMessage.innerHTML = "Profile updated succesfully.";
              }else{
                successMessage.innerHTML = "Everything is up to date.";
              }
              successMessage.style.display = "block";
              setTimeout(function(){$(successMessage).fadeOut(1000);},2000);
            }
          });

        }

        closeEditSettingsMode();
        break;
      default:
        break;
    }

  }else{
    //open it
    isOpenedSettingsEditMode = true;

    settingsContainer = document.getElementsByClassName('settings-container');
    arrayInitialSettings = new Array();
    for(let i=0;i<settingsContainer.length;i++){
      arrayInitialSettings.push(settingsContainer[i].getElementsByClassName('settings-container-option')[0].getElementsByTagName('span')[0].innerHTML);
      //selecting which type of input
      let typeName = settingsContainer[i].getElementsByClassName('settings-container-title')[0].getElementsByTagName('span')[0].innerHTML;
      if(typeName != 'Date of registration'){//can't change reg date
        let spanTag = settingsContainer[i].getElementsByClassName('settings-container-option')[0].getElementsByTagName('span')[0];
        //special case for gender/lookingFor
        if(typeName == 'Gender' || typeName == 'Looking for'){
          let optionSelect = document.createElement('select');
          let optionArea1 = document.createElement('option');
          optionArea1.value = 'Male';
          optionArea1.innerHTML = 'Male';
          let optionArea2 = document.createElement('option');
          optionArea2.value = 'Female';
          optionArea2.innerHTML = 'Female';
          spanTag.parentNode.replaceChild(optionSelect, spanTag);
          //add optionArea1/2 as children of optionSelect
          optionSelect.appendChild(optionArea1);
          optionSelect.appendChild(optionArea2);
          //change selected
          if(spanTag.innerHTML == 'Male'){
            optionSelect.selectedIndex = 0;
          }else if(spanTag.innerHTML == 'Female'){
            optionSelect.selectedIndex = 1;
          }

        }else{
          let new_date = new Date();
          if(typeName == 'Date of birth'){
            //datetime
            typeName = 'date';
            let oldDate = new Date(settingsContainer[i].getElementsByClassName('settings-container-option')[0].getElementsByTagName('span')[0].innerHTML);

            new_date = appendLeadingZeros(oldDate.getDate()) + "-" + appendLeadingZeros(oldDate.getMonth() + 1) + "-" + oldDate.getFullYear();
          }else{
            //text
            typeName = 'text';
          }

          let inputArea = document.createElement('input');

          inputArea.setAttribute("name", "_updInp"+(i+1));
          inputArea.setAttribute("class", "inputArea");
          inputArea.setAttribute("type", typeName);
          if(typeName == 'date'){
            inputArea.setAttribute("placeholder", "DD-MM-YYYY");
            inputArea.value = new_date;
          }else{
            inputArea.value = spanTag.innerHTML;
          }

          spanTag.parentNode.replaceChild(inputArea, spanTag);
        }
      }
    }

    //just change the image of button
    let oldButton = document.getElementsByName('settings-edit-button')[0];
    oldButton.src = "Icons/IconTick.png";
    //add cancel button
    let btnCancel = document.createElement('button');
    btnCancel.setAttribute("class", "formButton");
    btnCancel.setAttribute("name", "_cancelSettingsParagraphProfile");
    btnCancel.innerHTML = "Cancel";
    document.getElementById('settings-main-inner-pane').appendChild(btnCancel);
    //$('[name=_cancelSettingsParagraphProfile]').click(addEditButtonClickEvent);
    $('[name=_cancelSettingsParagraphProfile]').click(closeEditSettingsMode);
  }
}

//function for adding click event for edit buttons withing settings pages
function addEditButtonClickEvent(){

  $('[name=settings-edit-button]').click(insideOfEditSettings);
}

var openedSettingsPaneIndex = 0;

//function for settings menu - I made it separately because this menu is opened by two triggers
function selectSettingsMenu(){
  if(isProfileOptionsList){
    toggleProfileOptionsList();
  }
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
        $('#container-profile-inside-frame').css("height", "400px");
        //load first selected settings page
        $('#settings-main-inner-pane').load(
          'Includes/loadProfileSettings1.php',
          {
            _userId: document.getElementsByName('_loggedUserId')[0].value
          }, function(){
              //add click event for editing tool
              addEditButtonClickEvent();
              openedSettingsPaneIndex = 1;
          }
        );
        //load events for menu options
        $('[name=_settingsMenuOption1]').click(function(){
          isOpenedSettingsEditMode = false;
          $('#settings-main-inner-pane').load(
            'Includes/loadProfileSettings1.php',
            {
              _userId: document.getElementsByName('_loggedUserId')[0].value
            }, function(){
                //add click event for editing tool
                addEditButtonClickEvent();
                openedSettingsPaneIndex = 1;
            }
          );
        });
        $('[name=_settingsMenuOption2]').click(function(){
          isOpenedSettingsEditMode = false;
          $('#settings-main-inner-pane').load(
            'Includes/loadProfileSettings2.php',
            {
              _userId: document.getElementsByName('_loggedUserId')[0].value
            }, function(){
                //add click event for editing tool
                addEditButtonClickEvent();
                openedSettingsPaneIndex = 2;
            }
          );
        });
      }
    );
  }
}

let otherUserId = 0;

function openAProfile(userId, from){
  if(userId == document.getElementsByName('_loggedUserId')[0].value){
    //opening the user's profile
    toggleProfile();
  }else{

    if(from == 'friendlist'){
      toggleOtherProfile(userId, "friendlist");
    }else{
      //opening another profile
      toggleOtherProfile(userId, "_local");
    }
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


    otherUserId = contId;

    if(isOpenedOtherProfile == false)
      toggleOverlay('otherProfileContainer');
    document.getElementById('container-profile-other-frame').style.display = "block";

    isOpenedOtherProfile = true;
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
      if(from == "_local" || from == 'friendlist'){
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

      if(from =='friendlist'){
        //for loading the profile
        otherUserId = contId;
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
        isOpenedOtherProfile = false;
        document.getElementById('container-profile-other-frame').style.display = "none";
        toggleOverlay('otherProfileContainer');
        changeSelectedButtonOther(0);
      }


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

var isLoadingLikedListPicture = false;

function loadLikedStatePicture(picUrl){
  //load like state
  $('#container-picture-right-bar-like').load(
    'Includes/checkLikePictureCurrentUser.php',
    {
      _imgUrl: picUrl,
      _userId: document.getElementsByName('_loggedUserId')[0].value
    }, function(){
      //success
      //load container with the people that liked the picture
      $('._likedListPicture').hover(function(e){

        document.getElementById('container-liked-picture-list').style.display = "block";
        $('._likedListPicture').mousemove(function(e){
          if(isLoadingLikedListPicture == false){
            isLoadingLikedListPicture = true;
            //loading data
            $('#container-liked-picture-list').load("Includes/loadLikedPictureList.php",{
              _urlPic: picUrl
            });
            //calling function to show the container on mouse position
            hoverDivPicture(e);
          }
        });
      });

      $('._likedListPicture').mouseleave(function(e){
        isLoadingLikedListPicture = false;
        document.getElementById('container-liked-picture-list').style.display = "none";
      });
    }
  );
}

var isOpenedPictureContainer = false;

//for toggling picture container
function togglePictureContainer(picUrl){
  if(isOpenedPictureContainer == true){
    isOpenedPictureContainer = false;
    //closing it
    document.getElementById('container-picture-frame').style.display = "none";
    toggleOverlay('profileContainer');toggleOverlay('profileContainer');
  }else{
    toggleOverlay('pictureContainer');
    isOpenedPictureContainer = true;
    let picCont = document.getElementById('container-picture-frame');
    picCont.getElementsByTagName('img')[0].src = picUrl;

    //load right pane with info and stuff
    $('#container-picture-right-pane').load(
      'Includes/loadContainerPicture.php',
      {
        _imgUrl: picUrl,
        _userId: document.getElementsByName('_loggedUserId')[0].value
      }, function(){
        //success
        //load comments
        $('#container-picture-right-comments').load(
          'Includes/load-commentsPicture.php',
          {
            _urlPic: picUrl
          }, function(){
            //success

          }
        );

        //load like state
        loadLikedStatePicture(picUrl);

        //refresh like count
        $('[name=_likeCountPic]').load(
          'Includes/updateLikePictureCount.php',
          {
              _urlPic: picUrl
          }
        );

        //add bar buttons functionality
        $('#container-picture-right-bar-like').on('click', function(){
          likePicture(picUrl);
        });

        $('#container-picture-right-bar-comment').click(toggleAddCommentPicture);
        $('[name=post-comment-picture]').click(postCommentPicture);
        $('[name=reset-comment-picture]').click(resetCommentPicture);

        $('#container-picture-right-bar-share').click(toggleAddSharePicture);
        $('[name=post-share-picture]').click(postSharePicture);
        $('[name=reset-share-picture]').click(resetSharePicture);
      }
    );



    picCont.style.display = "block";
  }
}

function likePicture(picUrl){
  //call script to like post
  $.ajax({
    type: "POST",
    url: "Includes/likePicture.php",
    data: {
      _urlPic: picUrl,
      _idUser: document.getElementsByName('_loggedUserId')[0].value
    },
    success: function(){
      //change appareance
      let likeInnerText = document.getElementById('container-picture-right-bar-like').getElementsByTagName('h4')[0];
      if(likeInnerText.innerHTML == 'Like'){
        likeInnerText.innerHTML = 'Liked';
      }else if(likeInnerText.innerHTML == 'Liked'){
        likeInnerText.innerHTML = 'Like';
      }

      //refresh like count
      $('[name=_likeCountPic]').load(
        'Includes/updateLikePictureCount.php',
        {
            _urlPic: picUrl
        }
      );

      //show success message
      showSuccessMessage("likePicture");
    }
  });
}

var isOpenedAddCommentPicture = false;
var isOpenedAddSharePicture = false;

function toggleAddCommentPicture(){
  if(isOpenedAddCommentPicture == true){
    isOpenedAddCommentPicture = false;
    document.getElementById('container-add-comment-picture').style.display = "none";
    document.getElementById('container-add-comment-picture').getElementsByTagName('textarea')[0].value = "";
  }else{
    isOpenedAddCommentPicture = true;
    if(isOpenedAddSharePicture == true)
      toggleAddSharePicture();
    document.getElementById('container-add-comment-picture').style.display = "block";
  }
}

function postCommentPicture(){
  //alert('post');
  alert('Cooming soon');
}

function resetCommentPicture(){
  document.getElementById('container-add-comment-picture').getElementsByTagName('textarea')[0].value = "";
	toggleAddCommentPicture();
}

function toggleAddSharePicture(){
  if(isOpenedAddSharePicture == true){
    isOpenedAddSharePicture = false;
    document.getElementById('container-add-share-picture').style.display = "none";
    document.getElementById('container-add-share-picture').getElementsByTagName('textarea')[0].value = "";
  }else{
    isOpenedAddSharePicture = true;
    if(isOpenedAddCommentPicture == true)
      toggleAddCommentPicture();
    document.getElementById('container-add-share-picture').style.display = "block";
  }
}

function postSharePicture(){
  //alert('post');
  alert('Cooming soon');
}

function resetSharePicture(){
  document.getElementById('container-add-share-picture').getElementsByTagName('textarea')[0].value = "";
	toggleAddSharePicture();
}
