/* Getting Started:
Enter "USE {database};" before entering your SQL statements.
Type "--your question" + Enter to try out AI-generated SQL queries
Declare a parameter like "Where id = ${arg}".
*/
USE todo;
INSERT INTO `todos` (`task`,`description`,`status`) 
VALUES (${task},${description},${status});