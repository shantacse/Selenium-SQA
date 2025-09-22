##### Process for Selenium execusion

Step 1 -\> Launch the browser Step 2 -\> Navigate to the
Website/Application Step 3 -\> Add tasks to do Step 4 -\> Close The
Browser

##### STRUCTURE TO FIND XPATH

##### SAMPLE XPATH EXAMPLE

//input[@placeholder ='Search']

Where:

// -\> Need to set at the begining. input -\> Html tag name. \[\] -\>
Used for find Attributes of perticular tag name. @ -\> For Target
Attributes. ='attribute_name_here' -\> In Single Quotation need to use
attibutes name.

##### Tips

1.  If you one to check two xpath either first one or second one then
    need to write using pipeline operation as safetuy if change
    //input[@placeholder ='Search'] \| //input[@id ='Search']

2.  If no id or class found then find xpath
