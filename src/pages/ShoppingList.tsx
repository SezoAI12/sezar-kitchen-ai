
import Layout from '../components/Layout';
import PremiumFeatureGuard from '../components/PremiumFeatureGuard';

// This is just a placeholder component - in a real app, this would be implemented
// but would only be accessible to premium users
const ShoppingListContent = () => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Shopping List</h1>
        <p>Your shopping list content would go here.</p>
      </div>
    </div>
  );
};

const ShoppingList = () => {
  return (
    <Layout>
      <PremiumFeatureGuard featureName="Shopping List">
        <ShoppingListContent />
      </PremiumFeatureGuard>
    </Layout>
  );
};

export default ShoppingList;
