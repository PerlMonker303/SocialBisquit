<?php
  echo '
    <div id="main_page_c1">
      <h2>Welcome to</h2><h1><em>Anti-Social CrushR</em></h1>
      <h3>The platform where even anti-socials become socialists... I mean social</h3>
      <h1>WHAT is this?</h1>
      <h3>An ad-free social networking/dating platform.</h3>
      <h1>The aim?</h1>
      <h3>Bringing people together and offering them an ad-free environment
      which holds no boundaries</h3>
      <h1>What\'s the catch?</h1>
      <h3>There\'s no catch, seriously.</h3>
      <h4><i>(Trust me)</i></h4>
    </div>
    <div id="main_page_c2">
      <h2>Latest changes: v0.47 (29.08.19)</h2>
        <ul>
          <li><h4>Improved notification functionality and appearance</h4>
          </li>
          <li><h4>Adding friends is now working as smooth as sound</h4></li>

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
      <h2>So,</br> why not?</h2>
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
        </tr>
      </table>

    </div>
  ';
 ?>
