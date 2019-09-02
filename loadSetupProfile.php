<?php
  require 'dbh.php';

  echo '
    <h2>Setup your profile:</h2>

  <form action="Includes/update.php" method="post" enctype="multipart/form-data">
    <table>
      <tr>
        <td class="table-first">Secret question: </td>
        <td><select class="inputArea" name="setup_el1" required>

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
        <td><input type="password" class="inputArea" required name="setup_el2" id="secret-input"></input><input type="checkbox" onclick="secret_checkbox()" id="secretCheckbox">Show</input></td>
      </tr>
      <tr>
        <td class="table-first">Date of birth: </td>
        <td><input type="date" class="inputArea" name="setup_el3" required></input></td>
      </tr>
      <tr>
        <td class="table-first">Height: </td>
        <td><input type="number" step="0.01" class="inputArea" name="setup_el4" required></input>(meters)
        </td>
      </tr>
      <tr>
        <td class="table-first">Gender: </td>
        <td><select class="inputArea" name="setup_el5" required>
          <option disabled selected value>-- select an option --</option>
          <option value="is_male">Male</option>
          <option value="is_fem">Female</option>
        </select></td>
      </tr>
      <tr>
        <td class="table-first">Looking for: </td>
        <td><select class="inputArea" name="setup_el6" required>
          <option disabled selected value>-- select an option --</option>
          <option value="lf_male">Male</option>
          <option value="lf_fem">Female</option>
        </select></td>
      </tr>
      <tr>
        <td class="table-first">Where are you from: </td>
        <td><input type="text" class="inputArea" name="setup_el7" required></input></td>
      </tr>
      <tr>
        <td class="table-first">Where are you living: </td>
        <td><input type="text" class="inputArea" name="setup_el8" required></input></td>
      </tr>
      <tr>
        <td class="table-first">What is your profession: </td>
        <td><input type="text" class="inputArea" name="setup_el9" required></input></td>
      </tr>
      <tr>
        <td class="table-first">Bio: </td>
        <td><textarea class="inputArea" name="setup_el10" required></textarea></td>
      </tr>
      <tr>
        <td class="table-first">Upload a picture</td>
        <td><input type="file" class="inputArea" name="setup_el11" required></input> (.png,.jpg,.jpeg) <50kb</td>
      </tr>
    </table>
    <p>*It is advisable to create an account from a computer</br> - signing up from a smartphone might cause some yet-to-be-fixed image bugs*</p>
    <div id="profile-setup-buttons">
      <button class="formButton" type="submit" name="update-submit">Update</button>
      <input type="button" class="formButton" onclick="resetProfileSetup()" value="Reset"></input>
    </div>
  </form>
  ';
 ?>
