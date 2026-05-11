<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    $business = trim($_POST["business"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $phone = trim($_POST["phone"] ?? "");
    $website = trim($_POST["website"] ?? "");
    $projectType = trim($_POST["project_type"] ?? "");
    $preferredContact = trim($_POST["preferred_contact"] ?? "");
    $message = trim($_POST["message"] ?? "");

    if (empty($name) || empty($email) || empty($projectType) || empty($message)) {
        header("Location: contact.php?status=error");
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: contact.php?status=error");
        exit;
    }

    $to = "contact@ablesoftwareweb.com";
    $subject = "New Inquiry from Able Software & Web";

    $body = "You received a new inquiry from your website.\n\n";
    $body .= "Name: " . $name . "\n";
    $body .= "Business / Organization: " . ($business ?: "Not provided") . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Phone: " . ($phone ?: "Not provided") . "\n";
    $body .= "Website / Social Link: " . ($website ?: "Not provided") . "\n";
    $body .= "Project Type: " . $projectType . "\n";
    $body .= "Preferred Contact Method: " . ($preferredContact ?: "Not provided") . "\n\n";
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
  <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TM1E4BGZ6V"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-TM1E4BGZ6V');
</script>
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
          <li><a href="index.html#work">Work Examples</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.php" class="nav-cta">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

<main class="inner-page">
  <section class="inner-hero contact-hero">
    <div class="container narrow">
      <p class="eyebrow">Contact Able Software & Web</p>
      <h1>Start with what you have now and what is not working.</h1>
      <p>
        You do not need to know the exact technical solution before reaching out.
        Tell me what your business or nonprofit has now, what feels frustrating,
        and what you want customers or staff to be able to do more easily.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container contact-grid">
      <div class="contact-main">
        <div class="form-status">
          <?php if (isset($_GET['status']) && $_GET['status'] === 'success'): ?>
            <p class="success-message">
              Your message was sent successfully. I will review it and respond as soon as I can.
            </p>
          <?php elseif (isset($_GET['status']) && $_GET['status'] === 'error'): ?>
            <p class="error-message">
              There was a problem sending your message. Please check the required fields or email me directly.
            </p>
          <?php endif; ?>
        </div>

        <form class="contact-form enhanced-contact-form" action="contact.php" method="POST">
          <div class="form-row two-columns">
            <div class="form-field">
              <label for="name">Your Name <span>*</span></label>
              <input type="text" id="name" name="name" placeholder="Your name" required />
            </div>

            <div class="form-field">
              <label for="business">Business / Organization</label>
              <input type="text" id="business" name="business" placeholder="Business or nonprofit name" />
            </div>
          </div>

          <div class="form-row two-columns">
            <div class="form-field">
              <label for="email">Email <span>*</span></label>
              <input type="email" id="email" name="email" placeholder="you@example.com" required />
            </div>

            <div class="form-field">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567" />
            </div>
          </div>

          <div class="form-field">
            <label for="website">Current Website or Social Media Link</label>
            <input
              type="text"
              id="website"
              name="website"
              placeholder="Website, Facebook page, Instagram, Google listing, etc."
            />
          </div>

          <div class="form-row two-columns">
            <div class="form-field">
              <label for="project_type">What do you need help with? <span>*</span></label>
              <select id="project_type" name="project_type" required>
                <option value="">Select one</option>
                <option>Online presence review</option>
                <option>New website</option>
                <option>Website refresh or mobile optimization</option>
                <option>Website care or ongoing support</option>
                <option>Workflow tool or automation</option>
                <option>Custom web app or software</option>
                <option>Not sure yet</option>
              </select>
            </div>

            <div class="form-field">
              <label for="preferred_contact">Preferred contact method</label>
              <select id="preferred_contact" name="preferred_contact">
                <option value="">No preference</option>
                <option>Email</option>
                <option>Phone call</option>
                <option>Text message</option>
              </select>
            </div>
          </div>

          <div class="form-field">
            <label for="message">What is going on? <span>*</span></label>
            <textarea
              id="message"
              name="message"
              rows="7"
              placeholder="Tell me what you have now, what you are trying to improve, and what would make this project useful for your business."
              required
            ></textarea>
          </div>

          <p class="form-helper">
            Required fields are marked with an asterisk. You can keep the message simple.
            A short explanation is enough to start the conversation.
          </p>

          <button type="submit" class="btn btn-primary">Send Inquiry</button>
        </form>
      </div>

      <aside class="contact-sidebar">
        <div class="contact-box contact-side-card">
          <h2>Not sure what to ask for?</h2>
          <p>
            That is fine. Many projects start with a rough problem, not a finished plan.
          </p>
          <ul class="check-list contact-check-list">
            <li>Your website is outdated or hard to use on a phone.</li>
            <li>You only have social media and want a stronger web presence.</li>
            <li>You need help keeping a website updated after launch.</li>
            <li>Your business tracks customers or requests in too many places.</li>
            <li>You are not sure whether you need a website, workflow tool, or simpler fix.</li>
          </ul>
        </div>

        <div class="contact-box contact-side-card">
          <h2>Direct contact</h2>
          <p>
            <strong>Email:</strong><br />
            <a href="mailto:contact@ablesoftwareweb.com">contact@ablesoftwareweb.com</a>
          </p>
          <p>
            <strong>Website:</strong><br />
            ablesoftwareweb.com
          </p>
          <p class="contact-note">
            Most inquiries receive a response within one business day.
          </p>
        </div>

        <div class="contact-box contact-side-card dark-contact-card">
          <h2>What happens next?</h2>
          <ol class="contact-steps">
            <li>I review what you sent.</li>
            <li>I may ask a few follow-up questions.</li>
            <li>We talk through the best next step.</li>
            <li>If there is a good fit, I prepare a practical recommendation.</li>
          </ol>
        </div>
      </aside>
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