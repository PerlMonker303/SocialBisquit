<?php
  echo '
    <div id="main_page_c1">
      <h2>Welcome to</h2><h1><em>Social Bisquit</em></h1>
      <h3>The platform where even anti-socials become socialists... I mean social</h3>
      <h1>WHAT is this?</h1>
      <h3>An ad-free social networking/dating platform.</h3>
      <h1>WHY?</h1>
      <h3>To bring people together and offer them an ad-free environment
      which holds no boundaries</h3>
      <h1>WHAT\'s the catch?</h1>
      <h3>There\'s no catch, seriously.</h3>
      <h4><i>(Trust me)</i></h4>
    </div>
    <div id="main_page_c2">
      <h2>Latest changes: v0.63 (13.09.19)</h2>
        <ul>
          </li>
          <li><h4>Added option to visualize profile pictures in appropriate containers</h4></li>
          <li><h4>Changed the overall color scheme</h4></li>
          <li><h4>Changed the whole storage system for profile pictures</h4></li>
          <li><h4></h4></li>
        </ul>
      <h2>Found a <a href="https://www.youtube.com/watch?v=RpHBmm56di8" id="easterEgg2" target="_blank" style="text-decoration:none;color:#fdf7f7;font-style:italic;">pesky</a> bug?</h2>
      <h4>Tell me about it.</h4>
      <div>
        <textarea class="inputArea" name="_newFeedbackContent" required></textarea>
        <button class="formButton" name="_sendFeedbackButton" onclick="sendFeedback()">Send</button>
        <h4 style="display: none;" name="_feedbackError">*Can\'t send a blank feedback</h4>
        <h4 style="display: none;" name="_feedbackSuccess">Thank you!</h4>
      </div>
    </div>
    <div id="main_page_c3">
      <h2>It\'s FREE</h2>
      <h2>So, have a bisquit</h2>
      <h3 id="_joinButton" onclick="toggleSignupContainer()">Join now</h3>
      <h5 id="_useExistingButton" onclick="toggleLoginContainer()">Or use an existing account</h5>
    </div>
    <div id="main_page_c4">
      <h3>Loading stats...</h3>
    </div>
    <div id="main_page_c5">
      <h1>Why use this platform?</h1>
      <a href="https://www.youtube.com/watch?v=TUmG_mCS5HA" target="_blank" style="text-decoration:none;color:#fdf7f7;font-style:italic;" id="easterEgg1"><h2>Psh...</h2></a>
      <h1>The question should be <em>WHY NOT to use this platform?</em></h1>
    </div>
    <div id="main_page_c6">
      <h2>Contact me</h2>
      <h4>Mail: <em>ar_alexandrescu@yahoo.com</em></h4>
      <table>
        <tr>
          <td><a href="https://www.facebook.com/AlexandrescuAndreiRobert3" target="_blank" class="fa fa-facebook"></a></td>
          <td><a href="https://www.youtube.com/channel/UC-rg6fYJZv6mXh5_4udemXw" target="_blank" class="fa fa-youtube"></a></td>
          <td><a href="https://www.linkedin.com/in/andrei-robert-alexandrescu-189aa7192/" target="_blank" class="fa fa-linkedin"></a></td>
        </tr>
        <tr>
          <td><a href="https://github.com/PerlMonker303/SocialBisquit" target="_blank" class="fa fa-github"></a></td>
        </tr>
      </table>

    </div>
  ';
 ?>
