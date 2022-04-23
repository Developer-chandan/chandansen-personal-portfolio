 <?php
$visitors_name = $_POST['name'];
$visitors_email =$_POST['email'];
$visitors_phone =$_POST['phone'];
$visitors_subject =$_POST['subject'];
$visitors_message =$_POST['message'];

$email_from ="chandan2441139@gmail.com";
$email_subject ="New form submission";
$email_body = "User Name: $visitors_name.\n".
                "User Email: $visitors_email.\n".
                  "User Phone Number: $visitors_phone.\n".
                    "User Subject: $visitors_subject.\n".
                      "User Message: $visitors_message.\n";

      $to = "chandansenbu@gmail.com";
      $headers ="From: $email_form \r\n";
      $headers .= "Reply-to: $visitors_email \r\n";
      mail($to,$email_subject,$email_body,$headers);
      header("Location: contact.php")         

 ?> 
