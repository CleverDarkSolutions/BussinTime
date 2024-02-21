import Header from '@/components/custom/settings/header';
import {Divider} from '@mui/material';

const TosContainer = () => {
  return(
    <div className="w-[80vw] p-8">
      <Header text="Terms of Service"/>
      <Divider/>
      <div className="w-3/4 py-5">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          <p className="mb-4">
            <strong>Last Updated:</strong> October 20, 2023
          </p>

          <p className="mb-4">
            Welcome to ShopHub, a marketplace where buyers and sellers can connect and transact. Before using our services, please read these Terms of Service carefully. By accessing or using ShopHub, you agree to be bound by these terms.
          </p>

          <h3 className="text-xl font-semibold mt-4 mb-2">1. Acceptance of Terms</h3>
          <p>By using ShopHub, you acknowledge that you have read, understood, and agree to comply with these Terms of Service.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">2. User Accounts</h3>
          <p><strong>2.1. Registration:</strong> To use certain features, you may be required to create an account. You are responsible for providing accurate and up-to-date information.</p>
          <p><strong>2.2. Account Security:</strong> Keep your account credentials secure. You are responsible for all activities on your account.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">3. Buying and Selling</h3>
          <p><strong>3.1. Listing Items:</strong> Sellers must accurately describe items and adhere to any applicable laws and regulations.</p>
          <p><strong>3.2. Payments:</strong> Buyers and sellers agree to use the payment methods provided by ShopHub for transactions.</p>
          <p><strong>3.3. Shipping:</strong> Sellers are responsible for the timely delivery of items, and buyers are responsible for providing accurate shipping information.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">4. Content</h3>
          <p><strong>4.1. User-Generated Content:</strong> Users may post content, but it must not violate our guidelines, including content that is unlawful, offensive, or infringes on intellectual property rights.</p>
          <p><strong>4.2. Intellectual Property:</strong> ShopHub respects intellectual property rights. Users must do the same.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">5. Privacy</h3>
          <p>We collect and process personal information as outlined in our Privacy Policy.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">6. Termination</h3>
          <p>ShopHub may suspend or terminate your account for violations of these terms or for any other reason at our discretion.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">7. Dispute Resolution</h3>
          <p>Disputes between users should be resolved directly between the parties involved. ShopHub may provide assistance but is not responsible for resolving disputes.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">8. Limitation of Liability</h3>
          <p>ShopHub is not liable for any indirect, incidental, or consequential damages.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">9. Changes to Terms</h3>
          <p>These terms may be updated. We will notify users of any changes.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">10. Governing Law</h3>
          <p>These terms are governed by the laws of the state of [Your State/Country]. Any legal actions shall be brought in the courts of [Your Jurisdiction].</p>
        </div>
      </div>
    </div>
  )
}

export default TosContainer
