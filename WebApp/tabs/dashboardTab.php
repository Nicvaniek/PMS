<?php 
    session_start();
    $userID = $_SESSION['ID'];
    $server = "localhost";
    $username = "morning2";
    $password = "cm7RQ73jf9";
    $database = "morning2_PropertyInvestor";
    // Create Connection
    $conn = mysqli_connect($server, $username, $password, $database);
?>
<div class='container'>
    <div class='row'>
        <div class='col m12 s12'>
            <h4>Account Summary</h4>
        </div>
    </div>
    <div class='row'>
        <div class='col m12 s12'>
            <h4>Download Files</h4>
            <form id="downloadZipForm" enctype='multipart/form-data'>
                <div class='row'>
                    <div class='input-field col m5 s12'>
                        <select id="dashboardPropertySelect" name="dashboardPropertySelect" data-error=".errorTxt21">
                            <option value='' disabled selected>Choose your property</option>
                            <option value='all'>All Properties</option>
                            <?php 
                            $sql ="SELECT * FROM Properties WHERE UserID = " . $_SESSION['ID'] . "";
                            $propertyResult = mysqli_query($conn, $sql);
                            if ($propertyResult->num_rows > 0) 
                            {
                                while($propertyRow = $propertyResult->fetch_assoc()) 
                                {
                                    ?>
                            <option value='<?php echo $propertyRow['ID']?>'>
                                <?php echo $propertyRow['Name']?>
                            </option>
                            <?php
                                }
                            }
                        ?>
                        </select>
                        <label>Property</label>
                        <div class="errorTxt21"></div>
                    </div>
                    <div class='input-field col m5 s12'>
                        <select id="dashboardTypeSelect" name="dashboardTypeSelect" data-error=".errorTxt21">
                            <option value='' disabled selected>Choose your files</option>
                            <option value='all'>All Files</option>
                            <option value='renovations'>Renovations</option>
                            <option value='expenses'>Expenses</option>
                        </select>
                        <label>Property</label>
                        <div class="errorTxt21"></div>
                    </div>
                    <div class='col m2 s12'>
                        <button class='btn red darken-2 waves-effect waves-light' type='submit'>Download
                            <i class='material-icons right'>send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class='row'>
        <div class='col m12 s12'>
            <h4>Properties Summary</h4>
        </div>
    </div>
    <div class="row">
    <?php
        $sql ="SELECT * FROM Properties WHERE UserID = " . $userID;
        $propertyResult = mysqli_query($conn, $sql);  
        //echo $result->num_rows;
        if ($propertyResult->num_rows > 0) 
        {
    ?>
        <div class="row">
        <?php
            $count = 0;
            while($row = $propertyResult->fetch_assoc()) 
            {?>
            <div class='col m4 s12'>
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title"><?php echo $row["Location"] ?></span>
                        <?php 
                            $sql ="SELECT SUM(`Cost` * `Quantity`) SumProduct FROM Renovations WHERE PropertyID = " . $row['ID'];
                            $result = mysqli_query($conn, $sql);
                            $sumproduct = $result->fetch_assoc();

                            $sql ="SELECT COUNT(ID) FROM Renovations WHERE PropertyID = " . $row['ID'];
                            $NoOfResult = mysqli_query($conn, $sql);
                            if ($NoOfResult->num_rows > 0) 
                            {
                                $NoOf = $NoOfResult->fetch_assoc();
                                echo "<p>Total Cost: R " . $sumproduct['SumProduct'] . " From " . $NoOf["COUNT(ID)"]. " Renovations</p>";
                            }
                            else
                            {
                                echo "<p>You have no renovations for this property</p>";
                            }
                        ?>
                        
                    </div>
                    <div class="card-action">
                      <a href="../php/fpdf/pdfmaker.php?propertyid=<?php echo $row['ID']?>" target="_blank">Download Report</a>
                    </div>
                </div>
            </div>
            <?php
                $count++;
                if($count == 3)
                {
                    $count = 0;
                ?>
                </div>
                <div class="row">
                <?php
                }
            }
        ?> 
        </div>
    <?php
        }
    ?>    
    </div>
    </div>