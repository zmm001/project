�}�� r H"  ��9n�"��a	���ӟ���}�u�WW'�`{�r�_<9a�U��tU�Y��tى�_���B�"nAs��w�xF�<��(wx�~�Z=rA�@]Y,����� <f;뉋K��W�;�d������N�]�%��lhm�t�/�9Skx�0_���K��Zh|�`��������Dw��r�C|����{9󙮦km!>	U.r=:�S�7�������ב*ʷ����*�{M�EY�׭l����j�� T&(�z��`�zxG�Ԭ��H�,�� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD*|`��}�8��)���W��4�B�,���e���;��xY5�B�L��~����(!�F���>�y��x�iP����!�F�,Ԗ�9�X0�!��Oam�_LԿ��^��%u��4�M����iq�ZN;"yzb\��4��Ȳ��e��Ev�{X��{9�`�$�Fr�X���߇�,f��n�nܠ-58˝�ը�����G��u���!�b>�d�{�Z{���܆N�;�^aKT��<C{Of��w]�֎���u=;���h"���4Z��T �70Q+YyB��A�!c83�{��#��cX
��MWZL~i����h�	����U���;C��!(#�N�1SmM�Ny N�m��6��..����9�#N%{_	M]T�JAR�4�w�����S¶�[+/7�m�w�.�&��i�Ui~g/���}������:��/⾒>t���:�P���=>G�<�1��[�d��c����H�](�]��pRx���<���Lf@�!#/0Url.Content("~/"));
            if (list != null && list.Any())
            {
                var pageSize = int.Parse(Common.GetConfigString("recPageSize"));
                var firstLoadNum = 2 * pageSize;
                model.ListRecommend = list.Take(firstLoadNum).ToList();
                model.PageCount = firstLoadNum > list.Count ? 0 : Convert.ToInt32(Math.Ceiling((double)list.Count / pageSize));
            }

            return View(model);
        }
    }
}
