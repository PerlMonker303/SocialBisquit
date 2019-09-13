<?php
  require 'dbh.php';

  echo '
    <h2>Setup your profile:</h2>

  <div id="setup-form">
    <div id="profile-setup-success">
      <h3>-error-</h3>
    </div>
    <table>
      <tr>
        <td class="table-first">Secret question: </td>
        <td><select class="inputArea" name="setup_el1">

          <option disabled selected value>-- select an option --</option>';
          //setting secret question options

          $sql = "SELECT * FROM tbl_questions";
          $result = mysqli_query($conn, $sql);

          if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_assoc($result)){
              echo '<option value="'.$row['idQuestion'].'">'.$row['question'].'</option>';
            }
          }
  echo '
          </select>
        </td>
      </tr>
      <tr>
        <td class="table-first">Secret answer: </td>
        <td><input type="password" class="inputArea" name="setup_el2" id="secret-input" maxLength=40></input><input type="checkbox" onclick="secret_checkbox()" id="secretCheckbox">Show</input></td>
      </tr>
      <tr>
        <td class="table-first">Date of birth: </td>
        <td><input type="date" class="inputArea" name="setup_el3" type="date" placeholder="DD-MM-YYYY"></input></td>
      </tr>
      <tr>
        <td class="table-first">Gender: </td>
        <td><select class="inputArea" name="setup_el5">
          <option disabled selected value>-- select an option --</option>
          <option value="is_male">Male</option>
          <option value="is_fem">Female</option>
        </select></td>
      </tr>
      <tr>
        <td class="table-first">Looking for: </td>
        <td><select class="inputArea" name="setup_el6">
          <option disabled selected value>-- select an option --</option>
          <option value="lf_male">Male</option>
          <option value="lf_fem">Female</option>
        </select></td>
      </tr>
      <tr>
        <td class="table-first">Where are you from: </td>
        <td><input type="text" class="inputArea" name="setup_el7" maxLength=40></input></td>
      </tr>
      <tr>
        <td class="table-first">Where are you living: </td>
        <td><input type="text" class="inputArea" name="setup_el8" maxLength=40></input></td>
      </tr>
      <tr>
        <td class="table-first">What is your profession: </td>
        <td><input type="text" class="inputArea" name="setup_el9" maxLength=40></input></td>
      </tr>
      <tr>
        <td class="table-first">Bio: </td>
        <td><textarea class="inputArea" name="setup_el10" maxLength=500></textarea>(max 500 characters)</td>
      </tr>
      <tr>
        <td class="table-first">Upload a picture</td>
        <td><input type="file" class="inputArea" name="setup_el11"></input> (.png,.jpg,.jpeg) <50kb</td>
      </tr>
    </table>
    <div id="profile-setup-buttons">
      <button class="formButton" onclick="updateProfileSetup()">Update</button>
      <button class="formButton" onclick="resetProfileSetup()">Reset</button>
    </div>

  </div>
  ';
 ?>
