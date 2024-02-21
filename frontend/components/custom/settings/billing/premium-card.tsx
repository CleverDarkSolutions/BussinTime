import {Card} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Badge} from '@/components/ui/badge';
import CheckoutPopup from '@/components/custom/settings/billing/checkout-popup';

export type PremiumCardProps = {
  title: string;
  price: number;
  description: string;
  features: string[];
  clientSecret: string;
}

const PremiumCard = (props: PremiumCardProps) => {
  return(
    <div className="w-[65%] p-4">
      <Card>
        <div className="grid grid-cols-10 gap-2 p-4">
          <div className="col-span-10 text-4xl">{props.title}</div>
          <div className="col-span-10 text-2xl">${props.price}</div>
          <div className="col-span-10">
            {props.description}
          </div>
          <div className="col-span-10">
            <Label>{props.features?.map( (feature) => {
              return(
                <li className="flex items-center justify-between border-b border-gray-300 p-4">{feature}</li>
              )
            })}</Label>
          </div>
          <CheckoutPopup clientSecret={props.clientSecret}/>
        </div>
      </Card>
    </div>
  )
}

export default PremiumCard
