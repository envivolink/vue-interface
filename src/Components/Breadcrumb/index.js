import Breadcrumb from './Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem';
import VueInstaller from '../../Helpers/VueInstaller/VueInstaller';

VueInstaller.use({

    install(Vue, options) {
        VueInstaller.components({
            Breadcrumb,
            BreadcrumbItem
        });
    }

});

export default Breadcrumb;
