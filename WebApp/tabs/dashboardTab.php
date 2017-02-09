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
        <div class='col m12'>
            <h4>Account Summary</h4>
        </div>
    </div>
    <div class='row'>
        <div class='col m12'>
            <h4>Properties Summary</h4>
        </div>
    </div>
    <div class="row">
    <br>
    <?php
        $sql ="SELECT * FROM Properties WHERE UserID = 54";
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
            <div class='col m4'>
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