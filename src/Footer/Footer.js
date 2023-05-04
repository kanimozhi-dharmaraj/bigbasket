import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#f1f3f4", py: "30px" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom sx={{ color: "#71D138" }}>
                bigbasket
              </Typography>
              <Typography variant="body2" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" gutterBottom>
                In News
              </Typography>
              <Typography variant="body2" gutterBottom>
                Green BigBasket
              </Typography>
              <Typography variant="body2" gutterBottom>
                Privacy Policy
              </Typography>
              <Typography variant="body2" gutterBottom>
                Affiliate
              </Typography>
              <Typography variant="body2" gutterBottom>
                Terms and Conditions
              </Typography>
              <Typography variant="body2" gutterBottom>
                Careers At bigbasket
              </Typography>
              <Typography variant="body2" gutterBottom>
                bb Instant
              </Typography>
              <Typography variant="body2" gutterBottom>
                bb Daily
              </Typography>
              <Typography variant="body2" gutterBottom>
                bb Blog
              </Typography>
              <Typography variant="body2" gutterBottom>
                bbnow
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom sx={{ color: "#71D138" }}>
                Help
              </Typography>
              <Typography variant="body2" gutterBottom>
                FAQs
              </Typography>
              <Typography variant="body2" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" gutterBottom>
                bb Wallet FAQs
              </Typography>
              <Typography variant="body2" gutterBottom>
                bb Wallet T&Cs
              </Typography>
              <Typography variant="body2" gutterBottom>
                Vendor Connect
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
              <Typography variant="h6" gutterBottom sx={{ color: "#71D138" }}>
                Download Our App
              </Typography>
              <a
                href="https://play.google.com/store/apps/details?id=com.bigbasket.mobileapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.bbassets.com/static/v2662/custPage/build/content/img/Google-App-store-icon.png"
                  alt="Google Play"
                  style={{ display:"block",marginBottom: "10px" }}
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/bigbasket-grocery-shopping/id989523106"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.bbassets.com/static/v2662/custPage/build/content/img/Apple-App-store-icon.png"
                  alt="App Store"
                />
              </a>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom sx={{ color: "#71D138" }}>
                Get Social With Us
              </Typography>
              <FacebookOutlinedIcon  sx={{paddingRight:"10px"}}/>
              <PinterestIcon  sx={{paddingRight:"10px"}} />
              <TwitterIcon  sx={{paddingRight:"10px"}} />
              <InstagramIcon   sx={{paddingRight:"10px"}}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
  )
}

export default Footer