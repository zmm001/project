�}�� r   ���u�0��a	��.��_���}�����cq��f;�S�yo�&^�ss��B�L���� ��� i:pMFO�@��&�Sc��[U���=8�N�Ђ�r� 5�Ȟ&$�Q8�{z'F�����|;i0����������S����a>�0k�%�U%j�����<�pAA�aaĉ��p������)�s�J��^�;<X# �+&�GR3�E�ħ��S�闶��th)�"k)uH�\"<��>ɛ�@[�մl�G�@�H�@���Xp���n&�<�
��U۽�B]I/�����M��XH�yp�6-���^�p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD&�{��^'w$e0E=�1A��ԕ�va`wofS ��z=pA��?|I�C�m�9Ez��k�(೪1	P\��;B�0��ft��P��]W���W�hQF{���5�Aj�Ӥ�.Nb�~[��4�Xk�}UG}@�>��إd)����cn(��J�v�@�r!�~]@�s�4\ͩ�Jb^�&�	�Mۈ�@Y��Ύ���#o�i��}�h�
Tu\m��-U�%D�vp����5��6�x�A� �i"�]�p���Z#TӲUHF�1�~{K�,ǡ�)�����4��/�����Л��pY��ng_ՠ�w\�Ww3�Q��^G;�hJ<�ٴ���s1� M���{b����(�b�������9���j~�쪤� �4`[-E-���*&�eÕF��f .vn�&̙�t"�9�V�ȉ�ь��-?��5Ԅ?�r���否GW�S��a�l��G�[dơ���򈶤j��7ߘ��-�������]���7�)���J� ��9l����O�#Y���m�Mh�C�e˹�R��X'�\�A����6zga��L�H з݁A�ʣ������4Ց��M	j�L�\v�����ww0U�a�W�	aQ�F~�Y��Jm��Լ�� ��S�Fj"���*&-F�L���~�*��+e����S�^V-���e�Vd*�:�!aR�$y����o�AȾ�/!V�bA���ٻwY4��^57)�άo��_�}J ���T}���3w{�V��U��^��ѿ��d8sP̧�Mo�$�3� ��t��ivkk
�34=�8��ۿn��u*�I�cL�W��˙`�Z��CS�nm򏍏�ka����n񲘹���}���)�'8�d�2\�մ���L�1�}��]62�C����c�l,O㗰��{t�L�����k�/Sw���>"K-�;7)�eJ�vg��R�{��DS�z��`�����7*Կc��w��%Pw����NR�o!KV���[�[bc��ilD[.Պ�kt���a+U�(V̤<�ΆF�|>%	�zԾuV5��T��MO�qEt�|��x��D�B%w���D�u��p�]_�8L����[a��G	~ڲ�9r��˱g��D�������g�s�G�J������=��kM��""�������>�Y�.^�u,�66)�wO��0�4�IZc$�U���:���Ds!�^+P��,PLk�m�C�T�:jb.nE���.pD��8Y)B�af��F�E�y������`�h�߳8�b�(?Ă���z ���b��#ƭ$Kj �DE��o|u�~���BT�W�R���?�Ze��%��]-�vv��ͭn���D
���V�!Ǖx�@"����%sz��<��'-��	OzVK��0���u�J��/�2s~���ܣ�:�m'��g���`�)� E�H,o��hƟR/X�p�C��g8��?��y�7�7(�Pv�k�7��N��C*Q�Q�|9聒?��Ա� ɘ}d����Serialize();

            return jsonData;
        }
        public string GetLagLatByName(string name, string cityCodeOrName, NetworkType netType)
        {
            List<MapOwnerInfo9> list = instanceCore.GetLnglatByName(name, cityCodeOrName, netType);

            return list.Serialize();
        }
    }
}
