<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $message = trim($_POST["message"] ?? "");

    if (empty($name) || empty($email) || empty($message)) {
        header("Location: contact.php?status=error");
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: contact.php?status=error");
        exit;
    }

    $to = "contact@ablesoftwareweb.com";
    $subject = "New Website Inquiry from Able Software & Web";
    
    $body = "You received a new inquiry from your website.\n\n";
    $body .= "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n\n";
    $body .= "Message:\n" . $message . "\n";

    $headers = "From: contact@ablesoftwareweb.com\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: contact.php?status=success");
        exit;
    } else {
        header("Location: contact.php?status=error");
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact | Able Software & Web</title>
  <meta
    name="description"
    content="Contact Able Software & Web about workflow automation, business tools, and website projects."
  />
  <link rel="icon" href="images/favicon.ico" sizes="any" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container nav-wrap">
      <a href="index.html" class="logo-link" aria-label="Able Software & Web home">
        <img src="images/logo-horizontal.svg" alt="Able Software & Web logo" class="logo" />
      </a>

      <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">
        ☰
      </button>

      <nav class="site-nav">
        <ul>
          <li><a href="index.html#services">Services</a></li>
          <li><a href="index.html#work">Recent Work</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.php" class="nav-cta">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="inner-page">
    <section class="section">
      <div class="container narrow">
        <p class="eyebrow">Contact</p>
        <h1>Let’s Talk About Your Project</h1>
        <p>
          If your business has repetitive manual work, inefficient workflows, or needs a
          professional online presence, reach out and let’s discuss the best next step.
        </p>

        <div class="contact-box">
          <p><strong>Email:</strong> contact@ablesoftwareweb.com</p>
          <p><strong>Website:</strong> ablesoftwareweb.com</p>
        </div>

        <div class="form-status">
          <?php if (isset($_GET['status']) && $_GET['status'] === 'success'): ?>
            <p class="success-message">Your message was sent successfully.</p>
          <?php elseif (isset($_GET['status']) && $_GET['status'] === 'error'): ?>
            <p class="error-message">There was a problem sending your message. Please try again.</p>
          <?php endif; ?>
        </div>

        <form class="contact-form" action="contact.php" method="POST">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name" required />

          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required />

          <label for="message">Project Details</label>
          <textarea id="message" name="message" rows="6" placeholder="Tell me a little about your business and what you need." required></textarea>

          <button type="submit" class="btn btn-primary">Send Inquiry</button>
        </form>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-wrap">
      <div>
        <p class="footer-brand">© <span id="year"></span> Able Software & Web LLC</p>
        <p>Websites • Automation • Business Tools</p>
        <p><a href="mailto:contact@ablesoftwareweb.com">contact@ablesoftwareweb.com</a></p>
      </div>
      <div>
        <p><a href="index.html">Home</a></p>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>