/* Getting Started:
Enter "USE {database};" before entering your SQL statements.
Type "--your question" + Enter to try out AI-generated SQL queries
Declare a parameter like "Where id = ${arg}".
*/
USE todo;
UPDATE `todos` SET 
`status` = IF(length(${status})>0,${status},`status`),
`task` = IF(length(${task})>0,${task},`task`),
`description` = IF(length(${description})>0,${description},`description`)
 WHERE `id` = ${id} ;
