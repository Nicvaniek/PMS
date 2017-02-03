<?php 
    session_start();
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
        $sql ="SELECT * FROM Properties WHERE UserID = $userID";
        $result = mysqli_query($conn, $sql);  
        if ($result->num_rows > 0) 
        {
    ?>
        <div class="row">
        <?php
            $count = 0;
            while($row = $result->fetch_assoc()) 
            {?>
            <div class='col m4'>
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title"><?php echo $row["Location"] ?></span>
                        <?php 
                            $sql ="SELECT SUM(`Cost` * `Quantity`) SumProduct FROM Renovations WHERE PropertyID = " . $row['ID'];
                            $result = mysqli_query($conn, $sql);
                            $sumproduct = $result->fetch_assoc()

                            $sql ="SELECT COUNT(Cost) FROM Renovations WHERE UserID = " .  $userID . " AND PropertyID = " . $row['ID'] . "";
                            $NoOfResult = mysqli_query($conn, $sql);
                            $NoOf = $NoOfResult->fetch_assoc();
                        ?>
                        <p>Total Cost: R<?php echo $sumproduct['SumProduct']?> From <?php echo $NoOf["COUNT(Cost)"]?> Renovations</p>
                    </div>
                    <div class="card-action">
                      <a href="../php/fpdf/pdfmaker.php?id=<?php echo $row['ID']?>" target="_blank">Download Report</a>
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