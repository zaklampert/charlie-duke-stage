<?php
get_header();
?>

<div id="container">
<div id="content">
  <?php if(have_posts()) : while(have_posts()) : the_post(); ?>
    <h1 class="page-title"><?php the_title();?></h1>
    <div class="post" id="<?php the_ID(); ?>">
      <div class="entry">
        <div class="border-text"><?php the_content(); ?></div>
      </div>
    </div> <!-- .post -->

  <?php endwhile; endif; ?>

</div> <!-- end content -->
</div><!-- end container -->
<?php get_footer(); ?>
