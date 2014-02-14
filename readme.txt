_variables.scss file
Here are your available variables to play with. All values are initially in pixels.

// Variables in pixels
$grid: 12; // how many columns in your grid
$font_px: 16; // in pixels, 16px would be 1em or 100%
$gutter_px: 10; // the margin space between gutters in pixels
$page_width: 960; //desired page width in pixels
$page_min: 320; // minimum size for all screens
$tiny_max: 480; // max site for small screens
$small_max: 600; // max size for smallish screens
$medium_max: 768; // max size for medium screens

// Page Elements
$container_name: container; // Name of your body container (wrapper)
$gridwrap_name: grid_wrap; // Name of your grid container (wrapper)
$gridwrap_count: 4; //How many grid containers do you want created?

Adjust $grid, $page_width, $font_px, and $gutter_px to change about the values in your grid. 

Other values here are sporadically used throughout the _queries.scss file and are a main reason why this build is currently in Alpha.

_queries.scss file
mixin breakpoint($point)
This mixin uses the variables from _variables.scss file to produce media queries to be used throughout your stylings. It accepts the following values
smallest = breakpoints of page_min and tiny_max in _variables.scss
small = tiny_max to small_max
medium = small_max to medium_max
mediumish = medium_max to page_width
full = page_width
This mixin may or may not be useful and should more than likely be reworked.

mixin bodyminmax($sizes)
Used for setting container widths, uses the same list as above. The original idea was to pass it a list of values and loop through using a for loop for the containers you needed

mixin media_query_gen($min_width, $max_width)
This is called in the _grid.scss file when a min and max width argument is allowed

mixin media_query_minonly($min_width)
Same as above, used in _grid.scss file for min width argument


_grid.scss file
Grid System Mixins and explanations

The following mixins produce fixed width grids in em's

mixin grid_width()
This mixin includes no argument calls and will create an equal number of grid items based on the width and number of grid columns you defined in the variables file. Margins will be added to all grid columns. Floats are also automatically applied.

mixin column_combine ($combine_span)
This mixin allows you to create multi column grid items. It takes one argument, the number of columns you would like to span. Margins are automatically applied, as are floats

mixin mediamax_adapt ($combine_span, $min_width, $max_width)
This mixin takes 3 arguments, the number of columns you would like to span and the breakpoints at which these widths should be applied. Floats and media query automatically created

mixin media_adapt ($combine_span, $min_width)
Same as above but only accepts a min width. Floats and media query automatically generated.

mixin media_minonly ($combine_span, $min_width)
Not sure how this one is different from media_adapt

mixin mobile_grid ($combine_span)
Use for mobile first design (doing mobile last I'm assuming this would need width:100% added to it)

Changes in Display Type

mixin media_inline ($combine_span, $min_width, $max_width)
Same as mediamax_adapt but uses inline-block display instead of floats. Use <!-- --> markup between your wrappers to prevent unwanted breaks

mixin media_column ($combine_span, $min_width, $max_width)
This one uses display:table-cell instead of inline-block or floats. Will automatically resize but is less flexible due to the nature of table-cell. You'll need an element wrapper with display:table for this to work

Pushing and Pulling elements

mixin combine_pushpull($combine_span, $pushpull: push)
uses 2 arguments, the combine span you've been seeing throughout and the push / pull. Values are either "push" or "pull" with push being default. This will create the necessary negative margins to properly float elements on screen.
This also creates up to 3 placeholders for you to use on the container you are pushing and pulling off of. Placeholders are %push_$combinespan, %pull_%combinespan, and %pushpull which will produce the correct css to have elements float correctly. Gutters would then need to be added to the inner element of this container.


Nesting
_nest.scss

Nesting is used when you want to place grids inside of grids

mixin nesting ($combine_span, $nest_span)
Takes 2 variables, combine_span being the number of columns of the parent element and the nest_span being the number of columns you want for nesting. Margin is removed from the first and last element as these margins already exist on the parent. Uses floats

mixin media_nestmin ($combine_span, $nest_span, $min_width)
Per my notes this one is actually broken and should not be used (hence Alpha build)

mixin nestmax_adapt ($combine_span, $nest_span, $min_width, $max_width)
Pass in variables and media queries to create breakpoints in your design. Uses floats.

mixin nest_adapt ($combine_span, $nest_span, $min_width)
Same as above but only for min width

mixin mobile_nesting ($combine_span, $nest_span)
Use for mobile first design. (Would need a width of 100% added if doing mobile last design)

Changes in Display Type

mixin media_nesting ($combine_span, $nest_span, $min_width, $max_width)
Same as above, but allows for a min and max width to be passed for media queries. Uses TABLE-CELL for display



Percentage (Responsive) Grids
_percentages.scss

mixin grid_percent()
Takes the grid value from variables and creates an equal number of grids. Uses floats

mixin percent_combine ($combine_span, $upordown: up)
Number of columns you would like your grid to span. $upordown takes two values up or down. This is used for rounding the % values to a whole number and can be useful to create 100% grids as decimals or rounds in the wrong direction produce non 100% grids

mixin percent_pushnpull($combine_span, $upordown:up, $pushpull: push)
Allows for repositioning of grid elements. $upordown is either up or down for rounding %, $pushpull accepts either push or pull. Also provides placeholders %push_$combinespan and %pull_$combinespan for adding the correct amount of padding to the container. 
ALPHA build - need another %pushpull element created for width:100%, margin-right: -100%, and float:left for container

mixin percent_combine_push($combine_span, $upordown:up, $pushpull: push)
Instead of producing two different css classes needed on the element to push or pull, this does it all in one class (class name different from above.) Still produces the same %push and %pull placeholders

mixin percent_tablet($combine_span)
Doubles the width on your combine span. Produces both rounded up and down at the same time. Used for adjusting widths when using media queries

mixin percent_mobile($combine_span)
Set width of element to 100%. Produces both rounded up and down classes at same time. Again, used with media queries