'use client'
import '@/styles/globals.css'
import FeedbackForm from '@/components/custom/feedback/feedback-form';
import {Separator} from '@/components/ui/separator';
import Header from '@/components/custom/settings/header';
import ProvidersCombined from '@/utils/ProvidersCombined';
import {SiteHeader} from '@/components/custom/global/site-header';
import ChatTab from '@/components/custom/global/chat-tab';
import {Button} from '@/components/ui/button';

const Feedback = () => {
  return (
    <ProvidersCombined>
      <SiteHeader/>
      <ChatTab/>
      <div className="grid grid-cols-2 gap-4 p-8">
        <div className="col-span-1">
          <div className="my-2 text-2xl">
            <Header text="Feedback"/>
          </div>
          <div className="my-2 text-lg">
            Send us your feedback, so we can understand how to improve the app!
          </div>
          <Separator
            className="my-5"
            orientation="horizontal"
          />
          <Button>
            <a href="mailto:emil.twardzik.3@gmail.com"> Contact us at emil.twardzik.3@gmail.com</a>
          </Button>
        </div>
        <div className="col-span-1"/>
      </div>
    </ProvidersCombined>
  );
}

export default Feedback;
