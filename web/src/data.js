import moment from 'moment';

const lookupTemplate = (page) => {
  if (page.title === "Charlie Duke") {
    return "Hero";
  }

  if (!page.page_data.meta_box.page_format){
    return "Default"
  }
  switch(page.page_data.meta_box.page_format) {
    case "home_panel":
      return "Story";
    case "quote":
      return "About";
    case "shop":
      return "Shop";
    default:
      return "Story"
  }
}

const lookupChildTemplate = (child) => {
  if (!child.page_data.meta_box.page_format){
    return "Default"
  }
  switch(child.page_data.meta_box.page_format) {
    case "img_caption":
      return "ImageWithText";
    case "two_col":
      return "SideBySide";
    case "full_image":
      return "FullImage";
    case "quote":
      return "Quote";
    case "events":
      return "Events";
    default:
      return "Default";
  }
}
export const mapDataToPage = (dataFromWordpress) => {
  return dataFromWordpress && dataFromWordpress.filter(page => {
    return page && page.page_data && page.page_data.status && (page.page_data.status === "publish")
  }).map((page, i)=>{
     return {
      template: lookupTemplate(page),
      title: page.title,
      order: i,
      background: page &&
                  page.page_data && page.page_data.featured_image &&
                  page.page_data.featured_image.url,
      slug: page &&
            page.page_data &&
            page.page_data.slug,
      content: page && page.page_data &&  page.page_data.content && page.page_data.content.rendered,
      children: page && page.children && page.children.filter(child=>{
        return child && child.page_data && child.page_data.status && (child.page_data.status === "publish")
      }).map(child => {
        return {
          title: child && child.title,
          subtitle: child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.subtitle,
          slug: child && child.page_data && child.page_data.slug,
          template: child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.page_format && lookupChildTemplate(child),
          leftPhoto: child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.left_col_img && child.page_data.meta_box.left_col_img[0] && child.page_data.meta_box.left_col_img[0].url,
          rightPhoto: child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.right_col_img && child.page_data.meta_box.right_col_img[0] && child.page_data.meta_box.right_col_img[0].url,
          leftCaption:  child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.left_col_text,
          rightCaption:  child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.right_col_text,
          imageLink:child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.img_link,
          leftImageLink:child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.left_col_img_link,
          rightImageLink:child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.right_col_img_link,
          video: child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.video_url,
          leftVideo: child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.left_video,
          rightVideo: child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.right_video,
          showTitle: child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.title_display && (child.page_data.meta_box.title_display === "1"),
          image: child && child.page_data &&
                 child.page_data.featured_image &&
                 child.page_data.featured_image.url,
          imageWidth: child && child.page_data &&
                 child.page_data.featured_image &&
                 child.page_data.featured_image.width,
          imageHeight: child && child.page_data &&
                 child.page_data.featured_image &&
                 child.page_data.featured_image.height,
          content: child && child.page_data && child.page_data.content && child.page_data.content.rendered,
          navArrowColor: child && child.page_data && child.page_data.meta_box && child.page_data.meta_box.nav_arrow_color,
        }
      })
    }
  })
}

export const mapEvents = (dataFromWordpress) => {
  const yesterday = moment().subtract(2, 'days').format();
  return dataFromWordpress && dataFromWordpress.filter(event => {
    const eventDate = event && event.meta_box && event.meta_box.event_date && moment.utc(event.meta_box.event_date * 1000).format();
    return eventDate && (moment(eventDate).isAfter(yesterday, 'day'))
  }).map(event => {
    const eventDate = event && event.meta_box && event.meta_box.event_date && moment.utc(event.meta_box.event_date * 1000).format();
    const mappedEvent  = {
      id: event && event.id,
      published: event && event.status && (event.status === "publish"),
      eventDate,
      eventTime: event && event.meta_box && event.meta_box.event_start_time,
      title: event && event.title && event.title.rendered,
      venue: event && event.meta_box && event.meta_box.address_venue,
      address: event && event.meta_box && event.meta_box.address_formatted,
      event_link: event && event.meta_box && event.meta_box.event_link,
    }
    return mappedEvent;
  })
};

export const mapProducts = (dataFromWordpress) => {
  return dataFromWordpress && dataFromWordpress.map(product => {
    const mappedProduct = {
      id: product && product.id,
      title: product && product.title && product.title.rendered,
      description: product && product.content && product.content.rendered,
      image: product && product._embedded && product._embedded["wp:featuredmedia"] &&
      product._embedded["wp:featuredmedia"][0] && product._embedded["wp:featuredmedia"][0].source_url,
      variants: product && product.meta_box && product.meta_box.variants,
      price: product && product.meta_box && product.meta_box.price,
      domesticShipping: product && product.meta_box && product.meta_box.dom_shipping,
      internationalShipping: product && product.meta_box && product.meta_box.intnl_shipping,
    };
    return mappedProduct;
  })
};
