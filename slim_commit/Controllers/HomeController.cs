using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Mail;
using Mandrill.Requests.Messages;
using Mandrill.Models;
using Mandrill;
using slim_commit.Models;
using System.Configuration;

namespace slim_commit.Controllers
{
    public class HomeController : Controller
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["commit_dallas"].ConnectionString;


        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddEmail(string email)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("insert into Emails values(@email)", connection);
                command.Parameters.AddWithValue("email", email);
                try
                {
                    command.ExecuteNonQuery();
                }
                catch(SqlException ex){}
                
                connection.Close();
            }
            return new EmptyResult();
        }

        public ActionResult SendFeedback(string feedback)
        {
            //MailMessage mail = new MailMessage("commitdashboard@gmail.com", "incephalon@gmail.com", "User Feedback", feedback);
            //SmtpClient smtp = new SmtpClient("smtp.gmail.com",587);
            //smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            //smtp.UseDefaultCredentials = false;
            //smtp.Credentials = new System.Net.NetworkCredential("commitdashboard@gmail.com", "Commit!1*");// Enter seders User name and password
            //smtp.EnableSsl = true;
            //smtp.Send(mail);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("insert into Feedback values(@comment)", connection);
                command.Parameters.AddWithValue("comment", feedback);
                try
                {
                    command.ExecuteNonQuery();
                }
                catch (SqlException ex) { }

                connection.Close();
            }

            return new EmptyResult();
        }

        public ActionResult SendInvitation(InvitationModel model)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("insert into emailtofriends(name, email, message) values (@name, @email, @message)", connection);
                command.Parameters.AddWithValue("name", model.Name);
                command.Parameters.AddWithValue("email", model.Email);
                command.Parameters.AddWithValue("message", model.Message);

                try
                {
                    command.ExecuteNonQuery();
                }
                catch (SqlException ex)
                {
                    // do what?

                }
                finally
                {
                    connection.Close();
                }

                //Send mandril message
                try
                {
                    MandrillApi api = new MandrillApi(ProjectConfiguration.MandrillApiKey);
                    var emailMessage = new EmailMessage()
                    {
                        To = new List<EmailAddress>() { new EmailAddress(model.Email, "Invited") },
                        FromEmail = ProjectConfiguration.FromEmail,
                        FromName = ProjectConfiguration.FromName,
                        Subject = string.Format(ProjectConfiguration.InvitationEmailSubject, model.Name),
                        Merge = true,
                        MergeLanguage = "mailchimp"
                    };

                    emailMessage.AddGlobalVariable("invitername", model.Name);
                    emailMessage.AddGlobalVariable("invitermessage", model.Message.Replace("\n", "<br />"));

                    var request = new SendMessageTemplateRequest(emailMessage, "invitation", null);
                    var result = api.SendMessageTemplate(request);
                }
                catch (Exception ex)
                {
                    // do what?
                }

                return new EmptyResult();
            }
        }
    }
}